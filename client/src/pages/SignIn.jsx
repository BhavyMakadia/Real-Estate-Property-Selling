import React from "react";
import { useDispatch, useSelector } from "react-redux";
 import {
   signInStart,
   signInFailure,
   signInSuccess,
 } from "../redux/user/userSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/backend/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div>
      <section className="h-screen">
        <div className="h-fixed">
          <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="shrink-1 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <img
                src="https:tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
              />
            </div>

            <div className=" md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              <div className="bg-white rounded-2xl mr-8 ">
                <div className="p-12 max-w-lg mx-auto ">
                  <h1 className="text-3xl text-center font-semibold my-7">
                    Sign In
                  </h1>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                      type="email"
                      placeholder="Email"
                      className="border p-3 rounded-lg"
                      id="email"
                      onChange={handleChange}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="border p-3 rounded-lg"
                      id="password"
                      onChange={handleChange}
                    />

                    <button
                      disabled={loading}
                      className="bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                    >
                      {loading ? "Loading..." : "Sign In"}
                    </button>
                    <OAuth />
                  </form>
                  <div className="flex gap-2 mt-5">
                    <p>Dont have an account?</p>
                    <Link to={"/signup"}>
                      <span className="text-blue-600">Sign up</span>
                    </Link>
                  </div>
                  {error && <p className="text-red-500 mt-5">{error}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
