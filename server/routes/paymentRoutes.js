import express from 'express';
import {paymentRecord} from '../controllers/payment.js';

const router = express.Router();

router.get("/jazzcash", paymentRecord);

export default router;
