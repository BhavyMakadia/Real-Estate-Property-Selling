import bcryptjs from 'bcryptjs';
import User from '../modules/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../modules/listing.model.js';

export const test = (req, res) => {
  res.json({
    message: 'API route is work',

  });
}


export const deleteUser = async (req, res, next) => {

  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only delete your own account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json(0);
  } catch (error) {
    next(error);
  }

};

export const deleteUsers = async (req, res, next) => {

  const userId = req.params.id;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Perform any additional authorization checks here if needed
    // For example, ensure that the user making the request has the necessary permissions to delete the user

    // Delete the user
    await User.findByIdAndDelete(userId);

    // Optionally clear any user-specific data like cookies or sessions
    // For example, if you're using sessions, you might want to clear the session for the deleted user

    // Respond with a success message or data
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    // Handle any errors
    next(error);
  }

};

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, 'You can only view your own listings!'));
  }
};

export const getListings =async(req,res,next)=>{
  try {

    const listings = await User.find();
 
    return res.status(200).json(listings);
  
    
  } catch (error) {
    next(error);
  }
}

