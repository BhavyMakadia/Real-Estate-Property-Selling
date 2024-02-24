
import React, { useEffect, useState } from "react";
import Searchlistitem from "./Searchlistitem";
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../redux/user/userSlice';
import { Link } from 'react-router-dom';

export default function AdminUser() {
  const [userListings, setUserListings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleshowListings = async () => {
    try {
      const res = await fetch('/backend/user/getuser');
      const data = await res.json();
      setUserListings(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      dispatch(deleteUserFailure(error.message)); // Dispatch failure action
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
     dispatch(deleteUserStart());
      const res = await fetch(`/backend/user/deletes/${userId}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      console.log(data);
      if (!data.success) {
        dispatch(deleteUserFailure(data.message)); // Dispatch failure action
        return;
      }
    dispatch(deleteUserSuccess(data)); // Dispatch success action
      window.location.replace("/admin"); // Redirect to homepage after successful deletion
    } catch (error) {
      console.error('Error deleting user:', error);
      dispatch(deleteUserFailure(error.message)); // Dispatch failure action
    }
  };
  
  useEffect(() => { 
    handleshowListings();
  }, []);

  return (
    <div className="pl-64 bg-gradient-to-r from-blue-500 via-blue-300 to-cyan-100   ">
    <div className='flex flex-col mx-40'>
    <h1 className='text-center  text-2xl p-5 font-semibold'>Your Listings</h1>
    <div className="flex flex-col py-16">
        <div className="-m-1.5 overflow-x-auto">
          
          <div className=" relative overflow-x-auto  sm:rounded-lg">
          <table className="w-full text-sm text-left   ">
        <thead className="text-xs  bg-white uppercase">     
         <tr>
                    <th scope="col" className="px-6 py-3 uppercase">Image</th>
                    <th scope="col" className="px-6 py-3 uppercase">Name</th>
                    <th scope="col" className="px-6 py-3 uppercase">Email</th>
                    <th scope="col" className="px-6 py-3 text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="  border rounded-3xl ">
                  {userListings.map((listing) => (
                    <tr key={listing._id} className="  bg-gradient-to-r from-orange-200 to-cyan-200 ">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/listing/${listing._id}`}>
                          <img src={listing.avatar} alt='listing cover' className='h-16 w-16 object-contain' />
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-medium text-blue-800">{listing.username}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-800">{listing.email}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex gap-2">
                          <button onClick={() => handleDeleteUser(listing._id)} className="px-3 py-1 text-red-700 uppercase cursor-pointer">Delete ID</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
