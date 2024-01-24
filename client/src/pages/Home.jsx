import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function Home() {
  return (
 <div className="bg-[url('/src/img/img2.jpg')]  h-1/3 w" >   

 <div className="  flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
    <h1 className='text-slate-700 font-bold text-xl lg:text-6xl'>
    Service you Deserve,
People you Trust!
Let's find a home that's perfect for you.
    </h1> 
   
    <h1 className='text-blue-800 font-bold text-xl lg:text-xl '>
    Featuring luxury apartments and townhouses. 
    </h1>
    
    <div className='text-orange-800 text-xs sm:text-sm'>
     Bhavy Estate pvt ltd is the best place to find your next perfect place to
      live.
      <br />
      We have a wide range of properties for you to choose from.
    </div>
    
    <Link
      to={'/search'}
      className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
    >
    Do Filter...
    </Link>
    <div className='text-red-500 text-xs sm:text-sm'>
    Welcome to Bhavy Estate, where your dream home meets reality. As purveyors of exceptional real estate experiences, we pride ourselves on curating a portfolio of homes that embody sophistication, comfort, and the essence of modern living. 
      <br />
      We have a wide range of properties for you to choose from.
    </div>
    
  </div>
  

      </div>
  )
}
