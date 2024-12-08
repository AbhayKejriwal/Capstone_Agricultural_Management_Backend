// Purpose: Define routes for notification APIs. Maps routes to controller functions.
/** 
 * Notification API Endpoints:
 * - POST /api/notification
 * - GET /api/notification/:id
 * - PUT /api/notification/:id
 * - DELETE /api/notification/:id
 * - DELETE /api/notification/user/:id
*/

import express from 'express';
import { removeNotification, removeAllNotificationsByUserId, markNotificationRead, getNotificationsByUserId, postNotification, getUnreadNotificationsByUserId, markAllNotificationRead } from '../controllers/notification.controllers.js';
import { authenticate } from '../middlewares/authenticate.js';

const notificationRoutes = express.Router();

notificationRoutes.post('/', authenticate, postNotification);

notificationRoutes.get('/unread', authenticate, getUnreadNotificationsByUserId);

notificationRoutes.get('/', authenticate, getNotificationsByUserId);

notificationRoutes.put('/:id', authenticate, markNotificationRead);

notificationRoutes.put('/readAll', authenticate, markAllNotificationRead);

notificationRoutes.delete('/:id', authenticate, removeNotification);

notificationRoutes.delete('/', authenticate, removeAllNotificationsByUserId);

export default notificationRoutes;