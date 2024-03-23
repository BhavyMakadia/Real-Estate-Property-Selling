import express from 'express';
import { createListing,deleteListing ,editListing,getListing,getListings,getcount,deleteistadmin,updateListing} from '../controllers/listing.controller.js';     
import { verifyToken } from '../utils/verifyUser.js';
import User from '../modules/user.model.js';
import Listing from "../modules/listing.model.js";

const router =express.Router(); 
router.post('/create',verifyToken,createListing);
router.delete('/delete/:id',verifyToken,deleteListing);
router.post('/edit/:id',verifyToken,editListing);
router.get('/get/:id',getListing);
router.get('/get',getListings);
router.get('/counts',getcount);
router.delete('/deletes/:id', deleteistadmin);
router.post('/edits/:id', verifyToken, updateListing);
router.delete('/delete-review/:listingId/:reviewId', async (req, res) => {
  try {
    const { listingId, reviewId } = req.params;

    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    const reviewIndex = listing.reviews.findIndex(review => review._id.toString() === reviewId);

    if (reviewIndex === -1) {
      return res.status(404).json({ message: 'Review not found' });
    }

    listing.reviews.splice(reviewIndex, 1);
    await listing.save();

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/add-review', async (req, res) => {
  try {
    const { listingId, userId, name, rating, comment } = req.body;

    const listing = await Listing.findById(listingId);
    const user = await User.findById(userId);

    if (!listing || !user) {
      return res.status(400).json({ message: 'Listing or user not found' });
    }

    const review = {
      user: userId,
      name,
      rating,
      comment,
    };

    listing.reviews.push(review);
    await listing.save();

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/get-reviews', async (req, res) => {
  try {
    const listings = await Listing.find({});
    let allReviews = [];

    listings.forEach(listing => {
      listing.reviews.forEach(review => {
        allReviews.push({
          _id: review._id,
          listingId: listing._id.toString(),  // Convert ObjectId to string
          name: review.name,
          rating: review.rating,
          comment: review.comment
        });
      });
    });

    res.status(200).json({ success: true, reviews: allReviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});  
  router.get('/get/:listingId', async (req, res) => {
      try {
        const { listingId } = req.params;
        const listing = await Listing.findById(listingId);
        
        if (!listing) {
          return res.status(404).json({ success: false, message: 'Listing not found' });
        }
        
        res.status(200).json({ success: true, listing });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    });
    
export default router;