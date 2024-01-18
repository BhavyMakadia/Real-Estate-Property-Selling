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
export default function Profile() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [updateSuccess, setUpdateSuccess] = useState(false);

  //console.log(formData);
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
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" hidden accept="image/" />
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          onChange={handleChange}
          defaultValue={currentUser.username}
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
        />

        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="email"
          defaultValue={currentUser.email}
          id="email"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-70 disabled:opacity-70">
          update
        </button>
        <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-70 disabled:opacity-70" to={'/createlisting'}>
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-4">
        <span onClick={handleDeleteUser} className="text-red-600 text-lg font-bold cursor-pointer">
          DeleteID
        </span>
        <span onClick={handleSignOut} className="text-red-600 text-lg  font-bold cursor-pointer">
          Sign Out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated successfully!" : ""}
      </p>
    </div>
  );
}
