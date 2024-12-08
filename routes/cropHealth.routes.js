// cropHealth.routes.js
// Purpose: Define routes for crop health APIs. Maps routes to controller functions.
/**
 * Crop Health API Endpoints:
 * - POST /api/crop-health
 * - GET /api/crop-health
 * - GET /api/crop-health/:id
 * - PUT /api/crop-health/:id
 * - DELETE /api/crop-health/:id
 */

import express from 'express';
import { postCropHealth, getCropHealthByFarm, getCropHealthById, putCropHealth, removeCropHealth } from '../controllers/cropHealth.controllers.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';

const cropHealthRoutes = express.Router();

cropHealthRoutes.post('/', authenticate, authorize('farmer'), postCropHealth);

cropHealthRoutes.get('/farm/:id', authenticate, authorize('farmer'), getCropHealthByFarm);

cropHealthRoutes.get('/:id', authenticate, authorize('farmer'), getCropHealthById);

cropHealthRoutes.put('/:id', authenticate, authorize('farmer'), putCropHealth);

cropHealthRoutes.delete('/:id', authenticate, authorize('farmer'), removeCropHealth);

export default cropHealthRoutes;