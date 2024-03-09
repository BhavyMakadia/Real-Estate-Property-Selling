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
   signOutUserStart,
 } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function AdminProfile() {
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
   console.log(file);
  console.log(filePerc);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const res = await fetch(`/backend/user/update/${currentUser._id}`, {
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
      const res = await fetch(`/backend/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      window.location.replace("/");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    console.log("signout");
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/backend/auth/signout");
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
    <section className=" pl-64 gradient-form h-full   flex  rounded-5xl pb-2">
      <div className="container h-full bg-gradient-to-r from-blue-500 via-blue-300 to-cyan-100 ">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-cyan-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block  bg-gradient-to-r from-orange-400 to-green-300 shadow-lg ">
              <div className="g-0 lg:flex lg:flex-wrap ">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-4 md:p-8">
                    {/* <div className="text-center">
                      <img
                        className="mx-auto w-20"
                        src="./src/img/logo1.jpg"
                        alt="logo"
                      />
                      <h4 className="text-xl font-semibold text-gradient-to-r from-blue-500 via-blue-300 to-cyan-100 ">
                        We are best Property
                      </h4> */}
                      <div className=" flex flex-col mx-auto bg-center">
                        <div className="   ">
                          <div className="flex justify-center items-center rounded-3xl mx-auto pt-2 pb-10 ">
                            <div className="bg-blue-100 overflow-hidden shadow rounded-lg border">
                              <div className="px-2 py-2 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                  User Profile to do some changes
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                  This is some information about the user. here
                                  you do some changes
                                </p>
                              </div>
                              <div className="border-t border-gray-200 px-3 py-1 sm:p-0">
                                <form
                                  onSubmit={handleSubmit}
                                  className="flex flex-col gap-3 mx-auto"
                                >
                                  <input
                                    onChange={(e) => setFile(e.target.files[0])}
                                    type="file"
                                    ref={fileRef}
                                    hidden
                                    accept="image/*"
                                  />
                                  <img
                                    onClick={() => fileRef.current.click()}
                                    src={formData.avatar || currentUser.avatar}
                                    alt="profile"
                                    className="rounded-full h-20 w-20 object-cover cursor-pointer self-center mt-4"
                                  />
                                  <p className="text-base self-center">
                                    {fileUploadError ? (
                                      <span className="text-red-700">
                                        Error Image upload (image must be less
                                        than 2 mb)
                                      </span>
                                    ) : filePerc > 0 && filePerc < 100 ? (
                                      <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
                                    ) : filePerc === 100 ? (
                                      <span className="text-green-700">
                                        Image successfully uploaded!
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </p>
                                  <div className=" mx-auto">
                                    <label
                                      for="username"
                                      className="  text-blue-500
                   font-semibold"
                                    >
                                      Username:
                                    </label>
                                    <input
                                      type="text"
                                      onChange={handleChange}
                                      defaultValue={currentUser.username}
                                      placeholder="Username"
                                      id="username"
                                      className="border p-3 rounded-lg"
                                    />
                                  </div>
                                  <div className="mx-auto ">
                                    <label
                                      for="password"
                                      className=" text-blue-500 mx-auto font-semibold"
                                    >
                                      Password:
                                    </label>
                                    <input
                                      type="password"
                                      placeholder="Password"
                                      id="password"
                                      onChange={handleChange}
                                      className="border p-3 rounded-lg"
                                    />
                                  </div>
                                  <div className="mx-auto ">
                                    <label
                                      for="email"
                                      className=" text-blue-500 mx-auto font-semibold"
                                    >
                                      Email:
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="Email"
                                      defaultValue={currentUser.email}
                                      id="email"
                                      onChange={handleChange}
                                      className="border p-3 rounded-lg"
                                    />
                                  </div>
                                  <button className="bg-slate-700 text-white mx-auto rounded-lg p-5 uppercase hover:opacity-70 disabled:opacity-70">
                                    Update
                                  </button>
                                  <p className="text-red-700">
                                    {error ? error : ""}
                                  </p>
                                  <p className="text-green-700">
                                    {updateSuccess
                                      ? "User is updated successfully!"
                                      : ""}
                                  </p>

                                  <div className="flex gap-5 content-center mx-auto">
                                    {/* <span
                                      onClick={handleSignOut}
                                      className="text-blue-600  text-lg font-bold cursor-pointer"
                                    >
                                      Sign Out
                                    </span> 
                                    <span
                                      onClick={handleDeleteUser}
                                      className="text-red-600 text-lg font-bold cursor-pointer"
                                    >
                                      Delete Admin{" "}
                                    </span>*/}
                                  </div>
                                </form>
                              {/* </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none bg-gradient-to-r from-purple-500 via-red-600 to-yellow-700">
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12 bg-gradient-to-r from-purple-500 via-red-600 to-yellow-200 rounded-2xl">
                    <h4 className="mb-6 text-3xl font-semibold">
                      Welcome to Bhavy Estate
                    </h4>
                    <p className="text-lg">
                      Bhavy Estate is more than just a company. It's your
                      platform to list properties for sale and connect with
                      potential buyers. 
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
