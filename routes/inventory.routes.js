// Purpose: Define routes for inventory APIs. Maps routes to controller functions.
/** 
 * Inventory API Endpoints:
 * - POST /api/inventory
 * - GET /api/inventory/farm/:id
 * - GET /api/inventory/:id
 * - PUT /api/inventory/:id
 * - DELETE /api/inventory/:id
 */

import express from 'express';
import { postInventory, getInventoryByFarmId, getInventoryById, putInventory, removeInventory } from '../controllers/inventory.controllers.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';

const inventoryRoutes = express.Router();

inventoryRoutes.post('/', authenticate, authorize('farmer'), postInventory);

inventoryRoutes.get('/farm/:id', authenticate, authorize('farmer'), getInventoryByFarmId);

inventoryRoutes.get('/:id', authenticate, authorize('farmer'), getInventoryById);

inventoryRoutes.put('/:id', authenticate, authorize('farmer'), putInventory);

inventoryRoutes.delete('/:id', authenticate, authorize('farmer'), removeInventory);

export default inventoryRoutes;