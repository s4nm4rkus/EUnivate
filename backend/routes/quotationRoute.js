import express from 'express';
import { createQuotation } from '../controllers/quotationController';

const router = express.Router();

router.post('/quotation',createQuotation);

export default router;
