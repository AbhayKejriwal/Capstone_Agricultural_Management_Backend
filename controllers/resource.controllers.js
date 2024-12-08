// Implements functions to handle HTTP requests for resource data. Calls the service layer for business logic.
// Controller functions:
// - postResource(req, res)
// - getResourcesByFarmId(req, res)
// - getResourceById(req, res)
// - putResource(req, res)  
// - removeResource(req, res)
// - updateInventory() - to update based on resource usage

// Required modules
import { createResource, readResourcesByFarmId, readResourceById, updateResource, deleteResource } from '../services/resource.services.js';

// Create a new resource usage record
export async function postResource(req, res) {
    try {
        const { farmId, farm, itemType, quantity, usageDate } = req.body;

        if (!farmId || !farm || !itemType || !quantity) {
            console.log('Please provide all required fields: farmId, resourceId, quantity and date');
            console.log(req.body);
            return res.status(400).json({ message: 'Please provide all required fields: farmId, resourceId, quantity and date' });
        }

        const resource = {
            farmId,
            farm,
            itemType,
            quantity,
            usageDate
        };

        const newResource = await createResource(resource);

        res.status(201).json({
            message: 'Resource usage record created successfully',
            resource: newResource
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Get all resource usage records for a farm
export async function getResourcesByFarmId(req, res) {
    try {
        const farmId = req.params.id;
        const resources = await readResourcesByFarmId(farmId);
        if (!resources) {
            return res.status(404).json({ message: 'No resource usage records found for this farm' });
        }

        res.status(200).json(resources);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Get a resource usage record by ID
export async function getResourceById(req, res) {
    try {
        const resourceId = req.params.id;
        const resource = await readResourceById(resourceId);
        if (!resource) {
            return res.status(404).json({ message: 'Resource usage record not found' });
        }

        res.status(200).json(resource);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Update a resource usage record
export async function putResource(req, res) {
    try {
        const resourceId = req.params.id;
        const updateData = req.body;

        const updatedResource = await updateResource(resourceId, updateData);
        if (!updatedResource) {
            return res.status(404).json({ message: 'Resource usage record not found' });
        }

        res.status(200).json({
            message: 'Resource usage record updated successfully',
            resource: updatedResource
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Delete a resource usage record
export async function removeResource(req, res) {
    try {
        const resourceId = req.params.id;
        const deletedResource = await deleteResource(resourceId);
        if (!deletedResource) {
            return res.status(404).json({ message: 'Resource usage record not found' });
        }

        res.status(200).json({
            message: 'Resource usage record deleted successfully',
            resource: deletedResource
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}