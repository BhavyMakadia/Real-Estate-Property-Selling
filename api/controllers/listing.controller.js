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

export const deleteistadmin = async (req, res, next) => {

  const userId = req.params.id;

  try {
    // Check if the user exists
    const user = await Listing.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Perform any additional authorization checks here if needed
    // For example, ensure that the user making the request has the necessary permissions to delete the user

    // Delete the user
    await Listing.findByIdAndDelete(userId);

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    // Handle any errors
    next(error);
  }

};

export const getcount= async(req,res,next)=>{

  try {

    const listings = await Listing.find().count();
 
    return res.status(200).json(listings);
  
    
  } catch (error) {
    next(error);
  }
}

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

  export const getListings =async(req,res,next)=>{
    try {

                          //req for /get?limit=1xz or 9
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      let offer = req.query.offer;
            // for url seacrh we use undefined  || offer ===false is use for filter

      if (offer === undefined || offer === 'false') {
        offer = { $in: [false, true] };
        // false is if it  not seleted but true means if offer mean offer===false mean offer hoy ke no hoy badha leva ana     
      }
  
      let furnished = req.query.furnished;
  
      if (furnished === undefined || furnished === 'false') {
        furnished = { $in: [false, true] };
      }
  
      let parking = req.query.parking;
  
      if (parking === undefined || parking === 'false') {
        parking = { $in: [false, true] };
      }
  
      let type = req.query.type;
  
      if (type === undefined || type === 'all') {
        // type = { $in: ['sale', 'rent'] };
        type = { $in: ['sale'  ] };
      }
   
      const searchTerm = req.query.searchTerm || '';
  
      const sort = req.query.sort || 'createdAt'; //latest
  
      const order = req.query.order || 'desc';        
  
      const listings = await Listing.find({
        name: { $regex: searchTerm, $options: 'i' },//don't warry about lowercase and uppercase
        offer,
        furnished,
        parking,
        type,
      })
        .sort({ [sort]: order })
        .limit(limit) 
        .skip(startIndex);
   
      return res.status(200).json(listings);
    
      
    } catch (error) {
      next(error);
    }
  }