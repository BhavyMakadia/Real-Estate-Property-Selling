import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";

export default function AdminHome() {
  const [count, setCount] = useState([]);
  const [listcount, setListcount] = useState([]);
  
  const handleshowListings = async () => {
    try {
      const res = await fetch('/backend/user/count');
      const res1 =await fetch('/backend/listing/counts');
      const data = await res.json();
      const data1 = await res1.json();
      
           
      setCount(data);
      setListcount(data1);
    } catch (error) {
      setShowListingsError(true);
    }
  };
  useEffect(() => { 
    handleshowListings();
  },[]);
  return (
    
<div className="  bg-gradient-to-r from-orange-200 to-cyan-200    flex  items-center justify-around   pb-60 rounded-5xl">
    <div className='pl-64 flex-auto'>
        <h1 className="font-bold text-xl pt-20 text-center">
            Welcome to admin panel
        </h1>
        <div className="flex justify-around items-center flex-wrap mx-auto my-4">
            <div className="border rounded bg-gradient-to-r from-blue-300  to-blue-100 text-red-700 font-bold p-12 m-4 text-xl text-center" style={{ flex: '0 1 calc(33.33% - 40px)' }}>
                <p>Now we have number of users on our site</p>
                <h1 className="text-slate-800 font-bold text-xl lg:text-xl text-center" id="count1">{count}</h1>
            </div>
            <div className="border rounded bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 text-red-700 font-bold p-12 m-4 text-xl text-center" style={{ flex: '0 1 calc(33.33% - 40px)' }}>
                <p>Now we have number of properties on our site</p>
                <h1 className="text-slate-800 font-bold text-xl lg:text-xl text-center" id="count2">{listcount}</h1>
            </div>
        </div>
    </div>
</div>
  )
}
