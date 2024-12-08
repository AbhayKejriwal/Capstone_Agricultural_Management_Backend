// Implements the CRUD operations for the inventory collection
// service functions
// - createInventory: Create a new inventory item
// - readInventoryByFarmId: Retrieve all inventory items for a farm
// - readInventoryById: Retrieve an inventory item by ID
// - updateInventory: Update an existing inventory item
// - deleteInventory: Delete an existing inventory item

import { Inventory } from '../models/Inventory.js';

export const createInventory = async (inventoryData) => {
    return await Inventory.create(inventoryData);
}

export const readInventoryByFarmId = async (farmId) => {
    return await Inventory.find({ farmId: farmId });
}

export const readInventoryById = async (inventoryId) => {
    return await Inventory.findById(inventoryId);
}

export const updateInventory = async (inventoryId, inventoryData) => {
    return await Inventory.findByIdAndUpdate(inventoryId, inventoryData, { new: true });
}

export const updateInventoryByItem = async (farmID, itemType, quantity) => {
    return await Inventory.findOneAndUpdate({ farmId: farmID, itemType: itemType }, { $inc: { quantity: quantity } }, { new: true });
}

export const deleteInventory = async (inventoryId) => {
    return await Inventory.findByIdAndDelete(inventoryId);
}