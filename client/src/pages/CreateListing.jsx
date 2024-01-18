import React from "react";

export default function CreateListing() {
  return (
    <main className="p-2 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center my-9">Create a Listing</h1>
      <form className="flex flex-col sm:flex-row">
        <div className="flex flex-col gap-3 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />

          <textarea
            type="text"
            placeholder="Description"
            className="border p-2 rounded-lg"
            id="description"
            required
          />

          <input
            type="text"
            placeholder="Address"
            className="border p-2 rounded-lg"
            id="address"
            required
          />
          <div className="flex gap-5 flex-wrap">
            <div className="flex gap-2  font-bold text-slate-800">
              <input type="checkbox" id="sale" className="w-4" />
              <span>Sell</span>
            </div>

            <div className="flex gap-2  font-bold text-slate-800">
              <input type="checkbox"  id="rent" className="w-4" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2  font-bold text-slate-800">
              <input type="checkbox" id="parking" className="w-4" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2  font-bold text-slate-800">
              <input type="checkbox" id="furnished" className="w-4" />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2  font-bold text-slate-800">
              <input type="checkbox" id="offer" className="w-4" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-5  font-bold text-slate-800">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-2 border border-gray-300 rounded-lg"
              />
              <p>Beds</p>
            </div>

            <div className="flex items-center gap-1">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-2 border border-gray-300 rounded-lg"
              />
              <p>Baths</p>
            </div>
            
            <div className='flex items-center gap-1'>
              <input
                type='number'
                id='regularPrice'
                min='50'
                max='10000000'
                required
                className='p-2 border border-gray-300 rounded-lg'
                
              />
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                {(
                  <span className='text-xs'>($ / month)</span>
                )}

              </div>
            </div>
            <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-2 border border-gray-300 rounded-lg'
                  
                />
                <div className='flex flex-col items-center'>
                  <p>Discounted price</p>
                    <span className='text-xs'>($ / month)</span>
                </div>
              </div>
          </div>
        </div>
    
        <div className='flex flex-col flex-1 gap-4 mx-5'>
          <p className='font-bold text-red-500'>
            Images:
            <span className='font-normal text-blue-500 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex   gap-4 mx-5">
            <input  className="p-3 border border-gray-300 rounded w-full" type="file" id='images' accept="image/*" multiple/>
          <button className=" p-3 border border-slate-100 rounded uppercase hover:opacity-80  disabled:opacity-80font-bold text-slate-100 bg-slate-800 shadow-md">Upload</button>
          </div>
          <button className="  p-3 border rounded-lg border-slate-100 rounded uppercase hover:opacity-80  disabled:opacity-80 font-bold text-slate-100 bg-slate-800 shadow-md">ADD TO LISTING</button>
       
        </div>
        
        
       
      </form>
    </main>
  );
}
