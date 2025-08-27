// src/routes/views.routes.js
import { Router } from 'express';
import { renderRealtimeProducts ,renderNewProduct, renderEditProduct} from '../controllers/products.controller.js';

const router = Router();


router.get('/realtimeproducts', renderRealtimeProducts);
router.get('/products/new', renderNewProduct);
router.get('/products/edit/:id', renderEditProduct);
router.get('/', (req, res) => {
  res.render('documentacion', {
    title: '📘 Documentación de Rutas',
    layout: 'main', // opcional; ya es default
    routes: {
      products: [
        { method: 'GET',    path: '/api/products/',          desc: 'Obtener todos los productos',                           params: '-' },
        { method: 'GET',    path: '/api/products/:id',       desc: 'Obtener producto por ID',                               params: 'id: ID del producto' },
        { method: 'POST',   path: '/api/products/',          desc: 'Crear un nuevo producto',                                params: 'Body: datos del producto' },
        { method: 'PUT',    path: '/api/products/:id',       desc: 'Actualizar producto por ID',                             params: 'id: ID del producto, Body: campos a actualizar' },
        { method: 'DELETE', path: '/api/products/:id',       desc: 'Eliminar producto por ID',                               params: 'id: ID del producto' },
      ],
      carts: [
        { method: 'POST', path: '/api/carts/',                  desc: 'Crear un nuevo carrito',                              params: '-' },
        { method: 'GET',  path: '/api/carts/:cid',              desc: 'Obtener carrito por ID',                              params: 'cid: ID del carrito' },
        { method: 'POST', path: '/api/carts/:cid/product/:pid', desc: 'Agregar o incrementar producto en carrito',           params: 'cid: ID del carrito, pid: ID del producto' },
      ],
      views: [
        { method: 'GET', path: '/realtimeproducts',  desc: 'Vista en tiempo real de productos', params: '-' },
        { method: 'GET', path: '/products/new',      desc: 'Formulario para crear producto',    params: '-' },
        { method: 'GET', path: '/products/edit/:id', desc: 'Formulario para editar producto',   params: 'id: ID del producto' },
      ]
    }
  });
});
export default router;
