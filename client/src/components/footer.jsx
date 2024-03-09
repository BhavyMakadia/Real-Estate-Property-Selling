import React from 'react'
import {FaSearch} from 'react-icons/fa';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
export default function Footer() {
  const { currentUser } = useSelector((state) => state.user);
 
  return (
    <footer className="bg-[#83b8b8]  text-center bottom-0 fixed  w-full pl-24  ">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className=" pl-16 text-sm  sm:text-center font-bold ">© 2023 . All Rights Reserved.</span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 pr-24">
      <Link to='/About'> 
      <li className="hover:underline text-slate-100 hover:text-slate-500 me-4 md:me-6">About
        </li>
        </Link>
  
       

  <Link to='/Contactus'>
  <li className='hidden sm:inline text-slate-100 hover:text-slate-500 font-bold me-4 md:me-6 rounded '>Contact Us</li>
  </Link>
  
      </ul>
    </div>
  </footer>    
  )
}
