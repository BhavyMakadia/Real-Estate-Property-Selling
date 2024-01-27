import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function Home() {
  return (
 <div className="bg-[url('/src/img/bg2.png')] bg-cover h-screen" >   
 
 <div className="  flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
   
   <div className='m-20'>
    <h1 className='text- text-[#3A84ED]/80 font-bold text-xl lg:text-xl '>
    Featuring luxury apartments and townhouses. 
    </h1>
    
    <div className='text-gray-500 text-xs sm:text-sm'>
     Bhavy Estate pvt ltd is the best place to find your next perfect place to
      live.
      <br />
      We have a wide range of properties for you to choose from.
    </div>
    <h2>
    <Link
      to={'/search'}
      className=' sm:text-white/100 font-bold hover:underline'
    >
    Do Filter...
    </Link>
    </h2>
    </div>
  </div>
   

    </div>
  )
}
