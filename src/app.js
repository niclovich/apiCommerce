import express from 'express';
import productsRouter from './routes/products.routes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// ✅ Endpoint raíz
app.get('/', (req, res) => {
  res.send(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

// ✅ Montar rutas de productos
app.use('/api/products', productsRouter);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
