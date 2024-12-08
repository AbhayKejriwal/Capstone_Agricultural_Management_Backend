// Define the schema for the Market model
// Fields:
// - ListingId: Unique identifier for each market listing. auto assigned by MongoDB.
// - FarmId: Reference to the farm that created the listing (foreign key to the Farm model).
// - Farm: name of the farm
// - Product: String indicating the product being listed for sale.
// - Price: Number indicating the price of the product.
// - Quantity: Number indicating the quantity of the product available for sale.
// - OrderStatus: String indicating the status of the order (e.g., listed, bought, shipped, delivered).
// - BuyerId: Reference to the buyer who purchased the product (foreign key to the User model).
// Export the Market model to use in services and controllers.

import mongoose from 'mongoose';

const marketSchema = new mongoose.Schema({
    farmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farm',
        required: true
    },
    farm: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['listed', 'bought'],
        default: 'listed'
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

export const Market = mongoose.model('Market', marketSchema);