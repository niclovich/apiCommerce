// src/app.js
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';

import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewsRouter from './routes/views.routes.js';
import { setIO } from './controllers/products.controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VIEWS_DIR    = path.join(__dirname, 'views');
const LAYOUTS_DIR  = path.join(VIEWS_DIR, 'layouts');
const PARTIALS_DIR = path.join(VIEWS_DIR, 'partials'); // crea la carpeta (aunque esté vacía) o quita esta línea

const app = express();
const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);
const io = new Server(httpServer);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars
app.engine('handlebars', engine({
  extname: '.handlebars',
  defaultLayout: 'main',
  layoutsDir: LAYOUTS_DIR,
  partialsDir: PARTIALS_DIR,
  helpers: { eq: (a, b) => a === b }
}));
app.set('view engine', 'handlebars');
app.set('views', VIEWS_DIR);

// Socket.IO disponible en controladores (si lo usás para realtime)
setIO(io);

// === Routers ===
app.use('/', viewsRouter);                 // VISTAS: '/', '/products/new', '/products/:id/edit'
app.use('/api/products', productsRouter);  // API
app.use('/api/carts', cartsRouter);        // API

// Socket genérico (opcional)
io.on('connection', (socket) => {
  console.log('🔌 Cliente conectado:', socket.id);
  socket.on('disconnect', () => console.log('❌ Cliente desconectado:', socket.id));
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
