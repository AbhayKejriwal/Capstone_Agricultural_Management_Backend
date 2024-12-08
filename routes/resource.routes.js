// Purpose: Define routes for resource APIs. Maps routes to controller functions.
/**
 * Resource API Endpoints:
 * - POST /api/resource
 * - GET /api/resource/farm/:id
 * - GET /api/resource/:id
 * - PUT /api/resource/:id
 * - DELETE /api/resource/:id
 */

import express from 'express';
import { postResource, getResourcesByFarmId, getResourceById, putResource, removeResource } from '../controllers/resource.controllers.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';

const resourceRoutes = express.Router();

resourceRoutes.post('/', authenticate, authorize('farmer'), postResource);

resourceRoutes.get('/farm/:id', authenticate, authorize('farmer'), getResourcesByFarmId);

resourceRoutes.get('/:id', authenticate, authorize('farmer'), getResourceById);

resourceRoutes.put('/:id', authenticate, authorize('farmer'), putResource);

resourceRoutes.delete('/:id', authenticate, authorize('farmer'), removeResource);

export default resourceRoutes;