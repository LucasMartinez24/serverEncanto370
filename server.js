const express = require('express');
const mercadopago = require('mercadopago');
const cors = require('cors');
// Configurar las credenciales de Mercado Pago
mercadopago.configure({
  access_token:
    "APP_USR-3871730014452532-031523-a51fef4b6ec4244e836ff5225b6c734d-1896999924",
});
const corsOptions = {
  origin: 'http://localhost:4200',
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
      success: 'http://localhost:4200/pago-exitoso',
      failure: 'http://localhost:4200/pago-fallido',
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
app.listen(3001, () => {
  console.log('Servidor iniciado en http://localhost:3001');
});
