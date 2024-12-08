// Implements functions to handle HTTP requests for inventory data. Calls the service layer for business logic.
// Controller functions:
// - postInventory(req, res)
// - getInventoryByFarmId(req, res)
// - getInventoryById(req, res)
// - putInventory(req, res)
// - removeInventory(req, res)

// Required modules
import { createInventory, readInventoryByFarmId, readInventoryById, updateInventory, deleteInventory } from '../services/inventory.services.js';

// Create a new inventory item
export async function postInventory(req, res) {
    try {
        const { farmId, farm, itemType, quantity, lastUpdated } = req.body;

        if (!farmId || !farm || !itemType || !quantity) {
            console.log('Please provide all required fields: farmId, itemType and quantity');
            console.log(req.body);
            return res.status(400).json({ message: 'Please provide all required fields: farmId, itemType and quantity' });
        }

        const inventory = {
            farmId,
            farm,
            itemType,
            quantity,
            lastUpdated
        };

        const newInventory = await createInventory(inventory);

        res.status(201).json({
            message: 'Inventory item created successfully',
            inventory: newInventory
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Get all inventory items for a farm
export async function getInventoryByFarmId(req, res) {
    try {
        const farmId = req.params.id;
        const inventory = await readInventoryByFarmId(farmId);
        if (!inventory) {
            return res.status(404).json({ message: 'No inventory items found for this farm' });
        }

        res.status(200).json(inventory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Get an inventory item by ID
export async function getInventoryById(req, res) {
    try {
        const inventoryId = req.params.id;
        const inventory = await readInventoryById(inventoryId);
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        res.status(200).json(inventory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Update an existing inventory item
export async function putInventory(req, res) {
    try {
        const inventoryId = req.params.id;
        const updateData = req.body;

        const updatedInventory = await updateInventory(inventoryId, updateData);
        if (!updatedInventory) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        res.status(200).json({
            message: 'Inventory item updated successfully',
            inventory: updatedInventory
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Delete an existing inventory item
export async function removeInventory(req, res) {
    try {
        const inventoryId = req.params.id;
        const deletedInventory = await deleteInventory(inventoryId);
        if (!deletedInventory) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        res.status(200).json({
            message: 'Inventory item deleted successfully',
            inventory: deletedInventory
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}