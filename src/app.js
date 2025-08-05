import express from 'express';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';

const app = express();
const PORT = 3000;

// Mensaje centralizado
const SERVER_MSG = `🚀 Servidor corriendo en http://localhost:${PORT}`;

app.use(express.json());

// Endpoint raíz
app.get('/', (req, res) => {
  res.send(SERVER_MSG);
});

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
  console.log(SERVER_MSG);
});
