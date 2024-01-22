import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function Home() {
  return (
 <div className="bg-[url('/src/img/img2.jpg')]" >   <div className="  flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
    <h1 className='text-slate-700 font-bold text-xl lg:text-6xl'>
    Service you Deserve,
People you Trust!
Let's find a home that's perfect for you.
    </h1> 
   
    <h1 className='text-blue-800 font-bold text-xl lg:text-xl '>
    Featuring luxury apartments and townhouses. 
    </h1>
    
    <div className='text-gray-700 text-xs sm:text-sm'>
     Bhavy Estate pvt ltd is the best place to find your next perfect place to
      live.
      <br />
      We have a wide range of properties for you to choose from.
    </div>
    
    <Link
      to={'/search'}
      className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
    >
      Let's get started...
    </Link>

  </div>
  

      </div>
  )
}
