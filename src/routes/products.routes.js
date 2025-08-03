import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct
} from '../controllers/products.controller.js';

const router = Router();

// ✅ Rutas de productos
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);

export default router;
