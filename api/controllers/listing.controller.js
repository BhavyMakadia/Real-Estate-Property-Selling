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

export const deleteListing = async (req, res, next) => {
  const listing =await Listing.findById(req.params.id);  
  if(!listing){
    return next(errorHandler(404,'Not found'));
  }
  if(req.user.id !==listing.userRef){
    return next(errorHandler(401,'this is not your acoount to delete'));  
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('List deleted');
  } catch (error) {
    next(error);
  }
  };

  export const editListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, 'You can only update your own listings!'));
    }
  
    try {
      const editedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(editedListing);
    } catch (error) {
      next(error);
    }
  };
  
  export const getListing =async(req,res,next)=>{
    try {
      const listing =await Listing.findById(req.params.id);
      if(!listing){
        return next(errorHandler(404,'Listing not Found!'));
      }
      res.status(200).json(listing);
      
    } catch (error) {
      next(error);
    }
  }