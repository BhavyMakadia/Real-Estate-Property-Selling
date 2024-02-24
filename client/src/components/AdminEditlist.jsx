import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function AdminEditlist() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  const handleshowListings = async () => {
    try {
      const res = await fetch('/backend/listing/get');
      const data = await res.json();
           

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/backend/listing/deletes/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleshowListings();
  }, []); // Empty array && it is  effect runs only once when component mount
  
  return (
    
    <div className="bg-gradient-to-r from-blue-500 via-blue-300 to-yellow-500  mx-auto  bg-rounded-xl text-center content-center pl-64">
     
  
   
{showListingsError && (
  <p className='text-red-600 mt-5 p-1'>Error showing listings</p>
)}
{userListings && userListings.length > 0 && (
  <div className='flex flex-col mx-40 pb-12  '>
    <h1 className='text-center  text-2xl p-5 font-semibold'>Your Listings</h1>
    <div className=" relative overflow-x-auto  sm:rounded-lg">
      <table className="w-full text-sm text-left   ">
        <thead className="text-xs  bg-white uppercase  ">
          <tr>
            <th scope="col" className="px-6 py-3">
             Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Address           
               </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {userListings.map((listing) => (
            <tr key={listing._id} className="  bg-gradient-to-r from-orange-200 to-cyan-200 ">
              
              <td className="px-6 py-4 font-medium  whitespace-nowrap text-blue-900">{listing.name}</td>
              <td className="px-6 py-4">{listing.description}</td>
              <td className="px-6 py-4">{listing.address}</td>
              <td className="px-6 py-4">{listing.regularPrice}</td>
              <td className="px-6 py-4"> <img src={listing.imageUrls[0]} alt='listing cover' className='h-24 w-30 object-contain' /></td>
              <td className="px-6 py-4">
                <button onClick={() => handleListingDelete(listing._id)} className="px-3 py-1 text-red-700 uppercase cursor-pointer">Delete ID</button>
                <Link to={`/adminupdatelist/${listing._id}`}>
                  <button className='text-sky-700 uppercase'>Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

    </div> 
  );
}
