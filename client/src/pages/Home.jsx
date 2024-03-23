import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import Searchlistitem from "../components/Searchlistitem";
import "swiper/css/bundle";

export default function Home() {

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  console.log(saleListings);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/backend/listing/get?offer=true&limit=3");
        const data = await res.json();
        setOfferListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/backend/listing/get?type=sale&limit=3");
        const data = await res.json();
        console.log(data);
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, [location.search]);

  return (
    <div className=" pb-20">
    
    <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                 // backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="bg-[url('/src/img/bg2.png')] bg-cover h-screen">
        <div className="  flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h2 className="ml-20 mt-40">
              
              <form
          onSubmit={handleSubmit}
          className="bg-white p-3 rounded-lg items-center pl-45"
        >
          <input
            type="text"
            placeholder="Search.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus:outline-none w-40 sm:w-64 "
          />
          {/* <button>
            <FaSearch className="text-slate-900" />
          </button> */}
        </form>
      
            </h2>
          
          <div className="m-20">
            <h1 className=" text-[#3A84ED]/80 font-bold text-xl lg:text-xl ">
              Featuring luxury apartments and townhouses.
            </h1>

            <div className="text-gray-500 text-xs sm:text-sm">
              Bhavy Estate pvt ltd is the best place to find your next perfect
              place to live.
              <br />
              We have a wide range of properties for you to choose from.
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-gray-100">
                Recent offers
              </h2>
              <Link
                className="text-lg text-white hover:text-blue-500 "
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
            {offerListings.map((listing) => (
  <Searchlistitem list={listing} key={`offer_${listing._id}`} />
))}

            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-100">
                Recent places for sale
              </h2>
              <Link
                className="text-lg text-white hover:text-blue-500"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
            {saleListings.map((listing) => (
  <Searchlistitem list={listing} key={`sale_${listing._id}`} />
))}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}