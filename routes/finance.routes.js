// Purpose: Define routes for finance APIs. Maps routes to controller functions.
/**
 * Finance API Endpoints:
 * - POST /api/finance
 * - GET /api/finance/farm/:id
 * - GET /api/finance/:id
 * - PUT /api/finance/:id
 * - DELETE /api/finance/:id
 * - GET /api/finance/total/farm/:id
 */

import express from 'express';
import { postFinance, getFinanceByFarmId, getFinanceById, putFinance, removeFinance, getTotalFinancesByFarmId } from '../controllers/finance.controllers.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';

const financeRoutes = express.Router();

financeRoutes.post('/', authenticate, authorize('farmer'), postFinance);

financeRoutes.get('/farm/:id', authenticate, authorize('farmer'), getFinanceByFarmId);

financeRoutes.get('/:id', authenticate, authorize('farmer'), getFinanceById);

financeRoutes.put('/:id', authenticate, authorize('farmer'), putFinance);

financeRoutes.delete('/:id', authenticate, authorize('farmer'), removeFinance);

financeRoutes.get('/total/farm/:id', authenticate, authorize('farmer'), getTotalFinancesByFarmId);

export default financeRoutes;