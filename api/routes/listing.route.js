import express from 'express';
import { createListing,deleteListing ,editListing,getListing,getListings,getcount,deleteistadmin} from '../controllers/listing.controller.js';     
import { verifyToken } from '../utils/verifyUser.js';
const router =express.Router(); 
router.post('/create',verifyToken,createListing);
router.delete('/delete/:id',verifyToken,deleteListing);
router.post('/edit/:id',verifyToken,editListing);
router.get('/get/:id',getListing);
router.get('/get',getListings);
router.get('/counts',getcount);
router.delete('/deletes/:id', deleteistadmin);

export default router;