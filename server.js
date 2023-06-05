const express = require('express');
const mercadopago = require('mercadopago');
const cors = require('cors');
// Configurar las credenciales de Mercado Pago
mercadopago.configure({
  access_token: 'APP_USR-578899115377464-060216-c5bac25c48e6ffa5dcc9b2d52510fe36-1389116251',
});
const corsOptions = {
  origin: 'https://encanto370accesorios.vercel.app',
  optionsSuccessStatus: 200 // algunas versiones de IE11 y Safari pueden requerir esto
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
// Ruta para generar la preferencia de pago
app.post('/crear-preferencia', async (req, res) => {
  try {
    let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      success: 'https://encanto370accesorios.vercel.app/pago-exitoso',
      failure: 'https://encanto370accesorios.vercel.app/pago-fallido',
      pending: '/pago-pendiente',
    },
    auto_return: 'approved',
  };
  mercadopago.preferences
  .create(preference)
  .then(function (response) {
    res.json({
      id: response.body,
    });
  })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar la preferencia de pago' +req.body});
  }
});
// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});