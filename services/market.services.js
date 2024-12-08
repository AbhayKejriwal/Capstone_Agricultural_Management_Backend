// Implements the CRUD operations for the market collection
// service functions
// - createMarketListing: Create a new market listing
// - readMarketListings: Retrieve all market listings that are listed
// - readMarketListingByFarm: Retrieve all market listings for a farm
// - updateMarketListing: Update an existing market listing
// - deleteMarketListing: Delete an existing market listing

import { Market } from '../models/Market.js';

export const createMarketListing = async (marketData) => {
    return await Market.create(marketData);
}

export const readMarketListings = async () => {
    return await Market.find({ orderStatus: 'listed' });
}

export const readMarketListingById = async (listingId) => {
    return await Market.findById(listingId);
}

export const readMarketListingByFarm = async (farmId) => {
    return await Market.find({ farmId: farmId });
}

export const updateMarketListing = async (listingId, marketData) => {
    return await Market.findByIdAndUpdate(listingId, marketData, { new: true });
}

export const deleteMarketListing = async (listingId) => {
    return await Market.findByIdAndDelete(listingId);
}