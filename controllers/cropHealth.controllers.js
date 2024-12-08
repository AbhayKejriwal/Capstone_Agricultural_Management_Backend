// cropHealth.controller.js
// Purpose: Handle HTTP requests for crop health data. Calls the service layer for business logic.
/** controller functions:
 * - postCropHealth(req, res)
 * - getCropHealthByFarm(req, res)
 * - getCropHealthById(req, res)
 * - putCropHealth(req, res)
 * - removeCropHealth(req, res)
 */

// Required modules
import { createCropHealth, fetchCropHealthById, fetchCropHealthByFarmId, updateCropHealth, deleteCropHealth } from '../services/cropHealth.services.js';

// Create a new crop health record
export async function postCropHealth(req, res) {
    try {
        const { farmId, farm, healthStatus, issueDetected, recommendation } = req.body;

        if (!farmId || !farm || !healthStatus) {
            console.log('Please provide all required fields: farmId, farm and healthStatus');
            console.log(req.body);
            return res.status(400).json({ message: 'Please provide all required fields: farmId, farm and healthStatus' });
        }

        //check if a cropid exists for the current farmId
        //if it does, return a 400 error
        //if it doesn't, create a new crop health record
        const cropHealthExists = await fetchCropHealthByFarmId(farmId);
        if (cropHealthExists.length > 0) {
            return res.status(400).json({ message: 'Crop health record already exists for this farm' });
        }

        const cropHealth = {
            farmId,
            farm,
            healthStatus,
            issueDetected,
            recommendation
        };

        const newCropHealth = await createCropHealth(cropHealth);

        res.status(201).json({
            message: 'Crop health record created successfully',
            cropHealth: newCropHealth
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Get all crop health records for a farm
export async function getCropHealthByFarm(req, res) {
    try {
        const farmId = req.params.id;
        const cropHealth = await fetchCropHealthByFarmId(farmId);
        if (!cropHealth) {
            return res.status(404).json({ message: 'No crop health records found for this farm' });
        }
        res.status(200).json(cropHealth);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Get details of a specific crop health record
export async function getCropHealthById(req, res) {
    try {
        const id = req.params.id;
        const cropHealth = await fetchCropHealthById(id);
        if (!cropHealth) {
            return res.status(404).json({ message: 'Crop health record not found' });
        }
        res.status(200).json(cropHealth);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Update crop health record
export async function putCropHealth(req, res) {
    try {
        const cropHealthId = req.params.id;
        const updateData = req.body;
        const updatedCropHealth = await updateCropHealth(cropHealthId, updateData);
        if(!updatedCropHealth) {
            return res.status(404).json({ message: 'Crop health record not found' });
        }
        res.status(200).json({
            message: 'Crop health record updated successfully',
            cropHealth: updatedCropHealth
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Remove crop health record
export async function removeCropHealth(req, res) {
    try {
        const cropHealthId = req.params.id;
        // Check if crop health record exists
        const cropHealth = await fetchCropHealthById(cropHealthId);
        if (!cropHealth) {
            return res.status(404).json({ message: 'Crop health record not found' });
        }
        const deletedCrop = await deleteCropHealth(cropHealthId);
        res.status(200).json({ 
            message: 'Crop health record deleted successfully',
            deletedRecord: deletedCrop
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}