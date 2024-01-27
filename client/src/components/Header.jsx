import React from 'react'
import {FaSearch} from 'react-icons/fa';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
 
  return (
<header className='bg-[#90b3b7] '>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-2'>
    
<form className='bg-slate-100 p-1 rounded-lg flex items-center'>
<input type="text" placeholder="Search.." 
className='bg-transpert focus:outline-none w-24 sm:w-64' />
<FaSearch className='text-slate-600'/>
</form>

<Link to='/'>
    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap flex items-center gap-2'>
    
      
    <img
        src="/src/img/logo.png"
        alt="Your Image Description"
        className="mx-auto  rounded-lg shadow-lg max-w-14"
       
      />
</h1>

</Link>

<ul className='flex gap-4'>
  <Link to='/'>
  <li className='hidden sm:inline text-slate-100 hover:text-slate-500 font-bold  rounded '>Home</li>
  </Link>
  <Link to='/About'>
    <li className='hidden sm:inline text-slate-100 hover:text-slate-500 font-bold  rounded '>About</li>
  </Link> 
  {/* <Link to='/SignIn'>
    <li className='hidden sm:inline text-slate-100 hover:text-slate-500 font-bold  rounded '>SignIn</li>
  </Link> 
   */}
  <Link to='/Profile'>
            { currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className='hidden sm:inline text-slate-100 hover:text-slate-500 font-bold  rounded'> Sign in</li>
            )}
          </Link>

  </ul>
</div>
</header>
    
  )
}
