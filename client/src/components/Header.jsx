 import { FaSearch } from 'react-icons/fa';
 import { Link, useNavigate } from 'react-router-dom';
 import { useSelector } from 'react-redux';
 import { useEffect, useState } from 'react';

 export default function Header() {
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

   useEffect(() => {
     const urlParams = new URLSearchParams(location.search);
     const searchTermFromUrl = urlParams.get('searchTerm');
     if (searchTermFromUrl) {
       setSearchTerm(searchTermFromUrl);
     }
   }, [location.search]);
   return (
     <header className="bg-[#90b3b7] ">
       <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
    
<Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex-wrap flex items-center gap-2">
            <img
              src="/src/img/logo.png"
              alt="Your Image Description"
              className="mx-auto rounded-lg shadow-lg max-w-28"
            />
          </h1>
        </Link>



         <ul className="flex gap-1 text-sm sm:text-xl ">
         <li className="hidden sm:inline text-slate-100 hover:text-orange-200  font-bold  rounded ">
             
           <Link to="/">
               Home
             
           </Link>
           </li>
           
           <Link to="/About">
             {currentUser ? (
              
              
               <li className="hidden sm:inline text-slate-100 hover:text-slate-500 font-bold  rounded">
                 {" "}
                
               </li>
             ) : (
               <a href="/About" className=" text-white hover:text-orange-200 font-bold p-3  hover:opacity-70 disabled:opacity-70 rounded-full  object-cover">
               About
           </a>
             )}
           </Link>
 <Link to="/showlisting">
             {currentUser ? (
               <Link to="/showlisting" className=" text-white hover:text-orange-200 font-bold p-3  hover:opacity-70 disabled:opacity-70 rounded-full  object-cover">
               Show Listing
           </Link>
              
              
             ) : (
               <li className="hidden sm:inline text-slate-100 hover:text-slate-500 font-bold  rounded">
                 {" "}
                
               </li>
             )}
           </Link>
           <Link to="/Profile">
             {currentUser ? (
               <img
                 className="rounded-full h-14 w-14 object-cover"
                 src={currentUser.avatar}
                 alt="profile"
               />
              
              
             ) : (
               <li className="hidden sm:inline text-slate-100 hover:text-orange-200  font-bold  rounded">
                 {" "}
                 Sign in
               </li>
             )}
           </Link>

         
          

         
         </ul>
    
       </div>
     </header>
   );
 }
        
