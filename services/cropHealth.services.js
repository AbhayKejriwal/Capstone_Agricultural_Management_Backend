// cropHealth.service.js
// Purpose: Implement business logic for crop health operations. Interacts with the database.
// Contains CRUD operations for crop health records.
/** service functions:
 * - createCropHealth(data)
 * - fetchCropHealthById(cropHealthId)
 * - fetchCropHealthByFarmId(farmId)
 * - updateCropHealth(cropHealthId, updateData)
 * - deleteCropHealth(cropHealthId) 
 */

import { CropHealth } from '../models/CropHealth.js';

export const createCropHealth = async (data) => {
    return CropHealth.create(data);
}

export const fetchCropHealthById = async (cropHealthId) => {
    return CropHealth.findById(cropHealthId);
}

export const fetchCropHealthByFarmId = async (farmId) => {
    return CropHealth.find({farmId});
}

export const updateCropHealth = async (cropHealthId, updateData) => {
    return CropHealth.findByIdAndUpdate(cropHealthId, updateData, { new: true });
}

export const deleteCropHealth = async (cropHealthId) => {
    return CropHealth.findByIdAndDelete(cropHealthId);
}