/** Service functions for farm management:
 * - createFarm
 * - fetchFarmsByFarmerID
 * - fetchFarmById
 * - fetchFarm
 * - updateFarm
 * - deleteFarm
*/

import { Farm } from '../models/Farm.js';

export const createFarm = async (farm) => {
  return await Farm.create(farm);
}

export const fetchFarmsByFarmerID = async (farmerId) => {
  return await Farm.find({farmerId});
}

export const fetchActiveFarmsByFarmerID = async (farmerId) => {
  return await Farm.find({farmerId, status: 'active'});
}

export const fetchFarmById = async (id) => {
  return await Farm.findById(id);
}

export const fetchFarm = async (query) => {
  return await Farm.findOne(query);
}

export const updateFarm = async (id, updates) => {
  return await Farm.findByIdAndUpdate(id, updates, { new: true });
}

export const deleteFarm = async (id) => {
  return await Farm.findByIdAndDelete(id);
}