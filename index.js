// Import necessary modules: express, mongoose, routes
// Configure dotenv to load environment variables
// Initialize Express app
// Set up middlewares: JSON body-parser, CORS
// Mount routes: /api/auth, /api/foods, /api/orders
// Connect to MongoDB using mongoose with connection string from .env
// Add a global error handler
// Start the server and listen on a specific port

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './utils/connectDB.js';
import authRoutes from './routes/auth.routes.js';
import farmRoutes from './routes/farm.routes.js';
import cropHealthRoutes from './routes/cropHealth.routes.js';
import inventoryRoutes from './routes/inventory.routes.js';
import resourceRoutes from './routes/resource.routes.js';
import financeRoutes from './routes/finance.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import marketRoutes from './routes/market.routes.js';

const app = express();

const corsOptions = {
    origin: 'https://capstone-agricultural-management-frontend.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/farms', farmRoutes);
app.use('/api/cropHealth', cropHealthRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/market', marketRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
