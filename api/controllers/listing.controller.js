import Listing from "../modules/listing.model.js";
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
try {
console.log("suscess");  
    const listing = await Listing.create(req.body);
  
    return res.status(201).json(listing);
  } catch (error) {
    console.log("failure"); 
    next(error);
  }
};

export const uploadImages = async (req, res, next) => {
   
  };