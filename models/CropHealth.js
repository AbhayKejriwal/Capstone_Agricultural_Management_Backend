// CropHealth.js
// Purpose: Define the schema for storing crop health monitoring data in the database.

// Schema:
// - CropId: Unique identifier for the crop health record.
// - FarmId: Reference to the farm this crop belongs to.
// - Farm: Name of the farm.
// - HealthStatus: A string indicating the health status (e.g., 'Healthy', 'Diseased').
// - IssueDetected: A string describing any detected issues (e.g., 'Pests', 'Nutrient Deficiency').
// - Recommendation: A string suggesting actions to improve crop health.

import mongoose from 'mongoose';

const cropHealthSchema = new mongoose.Schema({
    farmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farm',
        required: true
    },
    farm: {
        type: String,
        required: true
    },
    healthStatus: {
        type: String,
        required: true
    },
    issueDetected: {
        type: String
    },
    recommendation: {
        type: String
    }
});

export const CropHealth = mongoose.model('CropHealth', cropHealthSchema);