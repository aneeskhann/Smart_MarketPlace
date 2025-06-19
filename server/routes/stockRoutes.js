import express from 'express';
import { updateStock, getStockByProductId, getAllStock } from '../controllers/stockController.js';

const router = express.Router();

// POST to update stock
router.put('/update', updateStock);

// GET to fetch stock by product ID
router.get('/:productId', getStockByProductId);

router.get('/', getAllStock);

export default router;


