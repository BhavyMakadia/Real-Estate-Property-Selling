import express from 'express';
import { createListing,uploadImages } from '../controllers/listing.controller.js';

import multer from 'multer';
import { verifyToken } from '../utils/verifyUser.js';


const router =express.Router();
const storage = multer.diskStorage({
    
  });


export default router;  