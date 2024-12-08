// Define the schema for the Farm model
// Fields:
// - FarmId: Unique identifier for each farm.
// - FarmerId: Reference to the user who owns the farm (foreign key to the User model).
// - Location: String describing the farm's location.
// - Size: Number indicating the size of the farm (e.g., in acres or hectares).
// - SoilType: String describing the type of soil (e.g., clay, sandy, loamy).
// - CropDetails: Array or object containing details of crops grown on the farm.
// - Status: String indicating the current status of the farm

// Export the Farm model to use in services and controllers.

import mongoose from 'mongoose';

const farmSchema = new mongoose.Schema({
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    soilType: {
        type: String,
        required: true
    },
    cropDetails: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
});

export const Farm = mongoose.model('Farm', farmSchema);