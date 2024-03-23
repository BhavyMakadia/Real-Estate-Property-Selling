import mongoose from 'mongoose';


const listingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },

        address: {
            type: String,
            required: true,
        },

        regularPrice: {
            type: String,
            required: true,
        },

        discountPrice: {
            type: Number,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        bedrooms:{
                type:Number,
                required:true,
        },
        furnished: {
            type: Boolean,
            required: true,
          },
          parking: {
            type: Boolean,
            required: true,
          },
          type: {
            type: String,
            required: true,
          },
          offer: {
            type: Boolean,
            required: true,
          },
          imageUrls: {
            type: Array,
            required: true,
          },
          userRef: {
            type: String,
            required: true,
          },
          reviews: [
            {
              user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
              },
              name: {
                type: String,
                required: true,
              },
              rating: {
                type: Number,
                required: true,
              },
              comment: {
                type: String,
                required: true,
              },
            },
          ],
        
    },{timestamps:true}
);
const Listing = mongoose.model('Listing',listingSchema);
export default Listing;