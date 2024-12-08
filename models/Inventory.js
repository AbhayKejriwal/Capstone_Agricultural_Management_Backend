// Define the schema for the Inventory model
// Fields:
// - InventoryId: Unique identifier for each inventory item. auto assigned by MongoDB.
// - FarmId: Reference to the farm where the inventory item is stored (foreign key to the Farm model).
// - Farm: name of the farm
// - ItemType: String indicating the type of item (e.g., seeds, fertilizers, pesticides).
// - Quantity: Number indicating the quantity of the item in stock.
// - LastUpdated: Date indicating the last time the inventory item was updated.
// Export the Inventory model to use in services and controllers.

import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
    farmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farm',
        required: true
    },
    farm: {
        type: String,
        required: true
    },
    itemType: {
        type: String,
        enum: ['seeds', 'fertilizers', 'pesticides', 'water'],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

export const Inventory = mongoose.model('Inventory', inventorySchema);