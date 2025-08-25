// src/routes/views.routes.js
import { Router } from 'express';
import { renderRealtimeProducts ,renderNewProduct, renderEditProduct} from '../controllers/products.controller.js';

const router = Router();


router.get('/realtimeproducts', renderRealtimeProducts);
router.get('/products/new', renderNewProduct);
router.get('/products/edit/:id', renderEditProduct);


export default router;
