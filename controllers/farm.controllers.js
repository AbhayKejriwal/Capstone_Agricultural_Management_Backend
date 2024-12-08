/** Controller functions for farm management:
 * - postFarm
 * - getFarms
 * - getFarmById
 * - putFarm
 * - removeFarm
 */

// Required modules
import { createFarm, fetchFarmsByFarmerID, fetchFarmById, updateFarm, deleteFarm, fetchActiveFarmsByFarmerID } from '../services/farm.services.js';

// Create a new farm
export async function postFarm(req, res) {
    try {
        const { location, size, soilType, cropDetails, status } = req.body;

        console.log(req.body);
        if (!location || !size || !soilType || !cropDetails) {
            return res.status(400).json({ message: 'Please provide all required fields: location, size, soilType, cropDetails' });
        }

        const farm = {
            farmerId: req.user.id,
            location,
            size,
            soilType,
            cropDetails,
            status
        };
        // console.log(farm);

        const newFarm = await createFarm(farm);
        // console.log(newFarm);
        
        res.status(201).json({
            message: 'Farm created successfully',
            farm: newFarm
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

// Get all farms for the logged-in user
export async function getFarms(req, res) {
    try {
        const farmerId = req.user.id;
        const farms = await fetchFarmsByFarmerID(farmerId);
        res.status(200).json(farms);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Get all active farms for the logged-in user
export async function getActiveFarms(req, res) {
    try {
        const farmerId = req.user.id;
        const farms = await fetchActiveFarmsByFarmerID(farmerId);
        res.status(200).json(farms);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


// Get details of a specific farm
export async function getFarmById(req, res) {
    try {
        const id = req.params.id;
        const farm = await fetchFarmById(id);
        res.status(200).json(farm);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Update farm details
export async function putFarm(req, res) {
    try {
        const farmId = req.params.id;
        const updates = req.body;
        const updatedFarm = await updateFarm(farmId, updates);
        res.status(200).json({
            message: 'Farm updated successfully',
            farm: updatedFarm
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Delete a farm
export async function removeFarm(req, res) {
    try {
        const farmId = req.params.id;
        await deleteFarm(farmId);
        res.status(200).json({ message: 'Farm deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}