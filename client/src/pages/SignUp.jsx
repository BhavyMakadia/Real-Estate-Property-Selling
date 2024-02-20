import { set } from "mongoose";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); //

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <section className="gradient-form bg-neutral-200 flex  items-center justify-around ">
      <div className="container h-full ">
        <div className="g-3 flex  flex-wrap items-center justify-center text-cyan-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-600">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-3 pb-10 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img
                        className="mx-auto w-36"
                        src="./src/img/logo1.jpg"
                        alt="logo"
                      />
                      <h4 className=" mt-1 pb-1 text-xl font-semibold">
                        We are for Property
                      </h4>
                      <div className="pl-2  max-w-lg mx-auto">
                        <h1 className="text-3xl text-center font-semibold my-7">
                          Hello,First We Sign Up
                        </h1>

                        <form
                          onSubmit={handleSubmit}
                          className="flex flex-col gap-4"
                        >
                          <input
                            type="text"
                            placeholder="Username"
                            className="border p-3 rounded-lg"
                            id="username"
                            onChange={handleChange}
                          />
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
                            className="bg-slate-700 text-white size-35px p-3  rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                            style={{ fontSize: "20px" }}
                          >
                            Sign up
                          </button>
                          <OAuth />
                        </form>
                        <div className="flex gap-2 mt-5">
                          <p>Have an account?</p>
                          <Link to={"/signin"}>
                            <span className="text-blue-700">Sign in</span>
                          </Link>
                        </div>
                        {error && <p className="text-red-500 mt-5">{error}</p>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none bg-gradient-to-r from-yellow-500 via-red-600 to-purple-700">
                  <div className="px-5 py-5 text-white md:mx-6 md:p-12 bg-gradient-to-r from-purple-500 via-red-600 to-yellow-500">
                    <h4 className="mb-6 text-xl font-semibold">
                      Welcome to Bhavy Estate
                    </h4>
                    <p className="text-sm">
                      Bhavy Estate is more than just a company. It's your
                      platform to list properties for sale and connect with
                      potential buyers. Lorem ipsum dolor sit amet, consectetur
                      adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam,
                      quis nostrud exercitation ullamco laboris nisi ut aliquip
                      ex ea commodo consequat.
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
