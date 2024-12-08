//Purpose: Define routes for market APIs. Maps routes to controller functions.
/**
 * Market API Endpoints:
 * - POST /api/market
 * - GET /api/market
 * - GET /api/market/farm/:id
 * - PUT /api/market/:id
 * - DELETE /api/market/:id
 */

import express from 'express';
import { postMarketListing, getMarketListings, getMarketListingByFarm, putMarketListing, removeMarketListing, markAsBought, getMarketListingById } from '../controllers/market.controllers.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';

const marketRoutes = express.Router();

marketRoutes.post('/', authenticate, authorize('farmer'), postMarketListing);

marketRoutes.get('/', authenticate, authorize('buyer'), getMarketListings);

marketRoutes.get('/:id', authenticate, authorize('farmer'), getMarketListingById);

marketRoutes.get('/farm/:id', authenticate, authorize('farmer'), getMarketListingByFarm);

marketRoutes.put('/:id', authenticate, authorize('farmer'), putMarketListing);

marketRoutes.put('/buy/:id', authenticate, authorize('buyer'), markAsBought);

marketRoutes.delete('/:id', authenticate, authorize('farmer'), removeMarketListing);

export default marketRoutes;