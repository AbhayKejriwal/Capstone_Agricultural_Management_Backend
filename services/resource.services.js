// Implements the CRUD operations for the resource collection
// service functions
// - createResource: Create a new resource usage record
// - readResourcesByFarmId: Retrieve all resource usage records for a farm
// - readResourceById: Retrieve a resource usage record by ID
// - updateResource: Update an existing resource usage record
// - deleteResource: Delete an existing resource usage record

import { Resource } from '../models/Resources.js';

export const createResource = async (resourceData) => {
    return await Resource.create(resourceData);
}

export const readResourcesByFarmId = async (farmId) => {
    return await Resource.find({ farmId: farmId });
}

export const readResourceById = async (resourceId) => {
    return await Resource.findById(resourceId);
}

export const updateResource = async (resourceId, resourceData) => {
    return await Resource.findByIdAndUpdate(resourceId, resourceData, { new: true });
}

export const deleteResource = async (resourceId) => {
    return await Resource.findByIdAndDelete(resourceId);
}