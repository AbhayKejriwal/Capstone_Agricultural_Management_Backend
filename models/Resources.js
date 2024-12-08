// Define the schema for the Resources model
// Fields:
// - ResourceId: Unique identifier for each resource usage. auto assigned by MongoDB.
// - FarmId: Reference to the farm where the resource is used (foreign key to the Farm model).
// - Farm: name of the farm
// - ItemType: String indicating the type of item (e.g., seeds, fertilizers, pesticides).
// - Quantity: Number indicating the quantity of the item used.
// - UsageDate: Date indicating the date the resource was used.
// Export the Resources model to use in services and controllers

import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
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
    usageDate: {
        type: Date,
        default: Date.now
    }
});

export const Resource = mongoose.model('Resource', resourceSchema);