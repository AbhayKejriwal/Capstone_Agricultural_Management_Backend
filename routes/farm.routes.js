/** Farm Management API Endpoints:
 * - POST /api/farms
 * - GET /api/farms
 * - GET /api/farms/:id
 * - PUT /api/farms/:id
 * - DELETE /api/farms/:id
 */

import express from 'express';
import { postFarm, getFarms, getFarmById, putFarm, removeFarm, getActiveFarms } from '../controllers/farm.controllers.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';

const farmRoutes = express.Router();

farmRoutes.post('/', authenticate, authorize('farmer'), postFarm);

farmRoutes.get('/active', authenticate, authorize('farmer'), getActiveFarms);

farmRoutes.get('/:id', authenticate, authorize('farmer'), getFarmById);

farmRoutes.get('/', authenticate, authorize('farmer'), getFarms);

farmRoutes.put('/:id', authenticate, authorize('farmer'), putFarm);

farmRoutes.delete('/:id', authenticate, authorize('farmer'), removeFarm);

export default farmRoutes;