// Implements functions to handle HTTP requests for market data. Calls the service layer for business logic.
// Controller functions:
// - postMarketListing(req, res)
// - getMarketListings(req, res)
// - getMarketListingByFarm(req, res)
// - putMarketListing(req, res)
// - removeMarketListing(req, res)

// Required modules
import { fetchFarmById } from "../services/farm.services.js";
import {
  createMarketListing,
  readMarketListings,
  readMarketListingByFarm,
  updateMarketListing,
  deleteMarketListing,
  readMarketListingById,
} from "../services/market.services.js";
import { createNotification } from "../services/notification.services.js";

// Create a new market listing
export async function postMarketListing(req, res) {
  try {
    const { farmId, farm, product, quantity, price } = req.body;

    if (!farmId || !farm || !product || !quantity || !price) {
      console.log(
        "Please provide all required fields: farmId, farm, product, quantity and price"
      );
      console.log(req.body);
      return res
        .status(400)
        .json({
          message:
            "Please provide all required fields: farmId, farm, product, quantity, price and orderStatus",
        });
    }

    const marketListing = {
      farmId,
      farm,
      product,
      quantity,
      price,
    };

    const newMarketListing = await createMarketListing(marketListing);

    res.status(201).json({
      message: "Market listing created successfully",
      marketListing: newMarketListing,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// Get all market listings
export async function getMarketListings(req, res) {
  try {
    const marketListings = await readMarketListings();
    if (!marketListings) {
      return res.status(404).json({ message: "No market listings found" });
    }

    res.status(200).json(marketListings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// Get a market listing by ID
export async function getMarketListingById(req, res) {
  try {
    const listingId = req.params.id;
    const marketListing = await readMarketListingById(listingId);
    if (!marketListing) {
      return res.status(404).json({ message: "Market listing not found" });
    }

    res.status(200).json(marketListing);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// Get all market listings for a farm
export async function getMarketListingByFarm(req, res) {
  try {
    const farmId = req.params.id;
    const marketListings = await readMarketListingByFarm(farmId);
    if (!marketListings) {
      return res
        .status(404)
        .json({ message: "No market listings found for this farm" });
    }

    res.status(200).json(marketListings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// Update a market listing
export async function putMarketListing(req, res) {
  try {
    const listingId = req.params.id;
    const marketListing = req.body;

    const updatedMarketListing = await updateMarketListing(
      listingId,
      marketListing
    );
    if (!updatedMarketListing) {
      return res.status(404).json({ message: "Market listing not found" });
    }

    res.status(200).json({
      message: "Market listing updated successfully",
      marketListing: updatedMarketListing,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// Mark a market listing as bought
export async function markAsBought(req, res) {
  try {
    const listingId = req.params.id;
    const buyerId = req.user.id;

    const updatedMarketListing = await updateMarketListing(listingId, {
      buyerId: buyerId,
      orderStatus: "bought",
    });
    if (!updatedMarketListing) {
      return res.status(404).json({ message: "Market listing not found" });
    }
    //send a notification to the farmer that his product has been bought
    // and to the buyer that his order has been placed
    await createNotification({
      userId: buyerId,
      message: `Your order for ${updatedMarketListing.product} has been placed`,
      type: "reminder",
    });

    const farm = await fetchFarmById(updatedMarketListing.farmId);
    await createNotification({
      userId: farm.farmerId,
      message: `Your product ${updatedMarketListing.product} has been bought`,
      type: "alert",
    });

    res.status(200).json({
      message: "Market listing updated successfully",
      marketListing: updatedMarketListing,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// Remove a market listing
export async function removeMarketListing(req, res) {
  try {
    const listingId = req.params.id;

    const deletedMarketListing = await deleteMarketListing(listingId);
    if (!deletedMarketListing) {
      return res.status(404).json({ message: "Market listing not found" });
    }

    res.status(200).json({
      message: "Market listing deleted successfully",
      marketListing: deletedMarketListing,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
