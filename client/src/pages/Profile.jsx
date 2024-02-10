/*import React from "react";
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
   
   
   <div className="bg-[#90b3b7]  flex flex-col flex-1 px-16  bg-center    ">
    <div className="  ">
    <h1 className="text-2xl font-bold text-center my-5  ">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
      
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
*/
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
    
    <div className="bg-[#90b3b7]  flex flex-col mx-auto bg-center">
        
    <div className="  ">
   
      <div className="flex justify-center items-center rounded-3xl mx-auto ">
      <div className="bg-white overflow-hidden shadow rounded-lg border">
         <div className="px-2 py-2 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                  User Profile to do some changes
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  This is some information about the user. here you do some changes
              </p>
           </div>
    <div className="border-t border-gray-200 px-4 py-4 sm:p-0">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mx-auto">
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
              className='rounded-full h-32 w-32 object-cover cursor-pointer self-center mt-4'
            />
            <p className='text-base self-center'>
              {fileUploadError ? (
                <span className='text-red-700'>Error Image upload (image must be less than 2 mb)</span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
              ) : filePerc === 100 ? (
                <span className='text-green-700'>Image successfully uploaded!</span>
              ) : (
                ''
              )}
            </p>
            <div className=" mx-auto">
                <label for="username" className="text-lg 
               font-semibold">Username:</label>
                <input
                  type="text"
                  onChange={handleChange}
                  defaultValue={currentUser.username}
                  placeholder="Username"
                  id="username"
                  className="border p-4 rounded-lg"
                />
            </div>
            <div className="mx-auto ">
                <label for="password" className="text-lg mx-auto font-semibold">Password:</label>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                  className="border p-4 rounded-lg"
                />
            </div>
            <div className="mx-auto ">
                <label for="email" className="text-lg mx-auto font-semibold">Email:</label>
                <input
                  type="text"
                  placeholder="Email"
                  defaultValue={currentUser.email}
                  id="email"
                  onChange={handleChange}
                  className="border p-4 rounded-lg"
                />
            </div>
            <button className="bg-slate-700 text-white mx-auto rounded-lg p-5 uppercase hover:opacity-70 disabled:opacity-70">
              Update
            </button>
            <p className="text-red-700">{error ? error : ""}</p>
            <p className="text-green-700">
              {updateSuccess ? "User is updated successfully!" : ""}
            </p>

            
            <div className="flex gap-3">
                <a href="/createlisting" className="bg-red-600 text-white rounded-lg p-4 uppercase hover:opacity-70 disabled:opacity-70">
                    Create Listing
                </a>
                <a href="/showlisting" className="bg-red-600 text-white rounded-lg p-4 uppercase hover:opacity-70 disabled:opacity-70">
                    Show Listing
                </a>
                <span onClick={handleSignOut} className="text-red-600 text-lg font-bold cursor-pointer">Sign Out</span>
                <span onClick={handleDeleteUser} className="text-red-600 text-lg font-bold cursor-pointer">Delete ID</span>
            </div>
        </form>
       
    </div>
</div>
      </div>
      </div>
    </div>
  );
}
