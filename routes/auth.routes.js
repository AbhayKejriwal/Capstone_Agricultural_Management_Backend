// Authentication Routes
// Defines API endpoints for user authentication and management.

import express from 'express';
import { registerUser, loginUser, getUser, putUser, removeUser, getAllUsers, getUserById, putUserById } from '../controllers/auth.controllers.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';

const authRoutes = express.Router();

authRoutes.post('/register', registerUser);

authRoutes.post('/login', loginUser);

authRoutes.get('/profile', authenticate, getUser);

authRoutes.get('/:id', authenticate, authorize('admin'), getUserById);

authRoutes.get('/', authenticate, authorize('admin'), getAllUsers);

authRoutes.put('/profile', authenticate, putUser);

authRoutes.put('/:id', authenticate, authorize('admin'), putUserById);

authRoutes.delete('/:id', authenticate, authorize('admin'), removeUser);

export default authRoutes;