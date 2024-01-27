import React from "react";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signInFailure,
  signOutUserStart
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
           
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [updateSuccess, setUpdateSuccess] = useState(false);

  
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  
  console.log(formData);
  




  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
 // console.log(file);
//console.log(filePerc);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
       setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res= await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      });
      const data =await res.json();
      if(data.success === false)
      {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      window.location.replace("/");
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message))

    }
  }
  const handleSignOut = async () => {
    console.log("signout");
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      
   
      window.location.replace("/signin");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  return (
   // <main className=" bg-[url('/src/img/img3.jpg')]  h-1/3 w-3/3
     //flex flex-col flex-1 gap-4   bg-rounded-xl">
   
   
   <div className="bg-[#90b3b7] 
   flex flex-col flex-1  bg-center    ">
    <div className="  ">
    <h1 className="text-2xl font-bold text-center my-9  ">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
      
      <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
          <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <span className=" font-semibold inline-block p-2 mx-24   uppercase rounded text-red-600 bg-lime-200  ">
  Enter your UserName:-
</span>
        <input
          type="text"
          onChange={handleChange}
          defaultValue={currentUser.username}
          placeholder="username"
          id="username"
          className="border p-3 mx-24 rounded-lg"
        />
 <span className=" font-semibold inline-block p-2  mx-24  rounded text-red-600 bg-red-200 uppercase ">
  Enter your Password:-
</span>
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="border p-3 rounded-lg mx-24"
        />
<span className=" font-semibold inline-block p-2   uppercase rounded text-red-500 bg-lime-200 mx-24">
  Enter your Email:-
</span>
        <input
          type="text"
          placeholder="email"
          defaultValue={currentUser.email}
          id="email"
          onChange={handleChange}
          className="border p-3 rounded-lg mx-24"
        />

        <button className="bg-slate-700 text-white rounded-lg p-3 mx-24 uppercase hover:opacity-70 disabled:opacity-70">
          update
        </button>
      {  /*<Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-70 disabled:opacity-70" to={'/createlisting'}>
          Create Listing
        </Link>*/}
      </form>
      <div className="flex justify-between mt-4">
        <span onClick={handleDeleteUser} className="text-red-600 text-lg font-bold cursor-pointer">
          DeleteID
        </span>
        <span  className=" cursor-pointer">
        <Link to="/createlisting" className="text-red-600 text-lg font-bold">
  Create Listing
</Link>
        </span>
        <span  className=" cursor-pointer">
        <Link to="/showlisting" className="text-red-600 text-lg font-bold">
  Show Listing
</Link>
        </span>
        <span onClick={handleSignOut} className="text-red-600 text-lg  font-bold cursor-pointer">
          Sign Out
        </span>
      </div>
      <p className="text-red-700 ">{error ? error : ""}</p>
      <p className="text-green-700 ">
        {updateSuccess ? "User is updated successfully!" : ""}
      </p>
    </div>
    </div>
    //</main>
  );
}
