import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AdminLayout() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  

  return (
    <div className='pl-64'>
      {/* AdminHeader */}
      <header className="bg-[#3e797f] ">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        
          <Link to="/admin">
            <h1 className="font-bold text-sm sm:text-xl  flex-wrap flex items-center gap-2">
              <img
                src="/src/img/logo.png"
                alt="Your Image Description"
                className="mx-auto  rounded-lg shadow-lg max-w-28"
              />
            </h1>
          </Link>

          <ul className="flex gap-4 text-sm sm:text-xl ">
           
            {/* <Link to='/SignIn'>
              <li className='hidden sm:inline text-slate-100 hover:text-slate-500 font-bold  rounded '>SignIn</li>
            </Link> */}
            <Link to="/adminprofile">
              {currentUser ? (
                <img
                  className="rounded-full h-14 w-14 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
              ) : (
                <li className="hidden sm:inline text-slate-100 hover:text-slate-500 font-bold  rounded">
                  {" "}
                  Sign in
                </li>
              )}
            </Link>
          </ul>
        </div>
      </header>

      {/* AdminSidebar */}
      <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-blue-900">
          <ul className="space-y-2 font-medium">

<li>
          <Link to="/admin">
          <h1 className="font-bold text-sm sm:text-xl  flex-wrap flex items-center gap-2">
            <img
              src="/src/img/logo1.jpg"
              alt="Your Image Description"
              className="mx-auto  rounded-lg shadow-lg max-w-28"
            />
          </h1>
        </Link>
        </li>
          <li>
          <Link to='/admin' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
  
  <span className="flex-1 ms-3 whitespace-nowrap">Admin</span>
</Link>
         </li>
         <li>
         <Link to='/adminUser' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
  
  <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
</Link>
         </li>
         <li>
         <Link to='/adminedit' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
  
  <span className="flex-1 ms-3 whitespace-nowrap">Listed property</span>
</Link>
         </li>
        
           
        
          </ul>
        </div>
      </aside>
    </div>
  );
}
