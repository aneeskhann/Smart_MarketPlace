import express from 'express';
import { createProduct, getProducts, getProductById } from '../controllers/product.js';
import { upload } from '../multer/multer_config.js';


const router = express.Router();

router.post('/',upload.single('image' || upload.multiple('image')), createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);

export default router;
