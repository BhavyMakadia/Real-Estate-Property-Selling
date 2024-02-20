import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import ListingItem from "../components/Searchlistitem";
import Searchlistitem from "../components/Searchlistitem";
import "swiper/css/bundle";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  console.log(saleListings);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=3");
        const data = await res.json();
        setOfferListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=3");
        const data = await res.json();
        console.log(data);
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
      <Swiper navigation autoplay={{ delay: 3000 }}>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center  no-repeat`,
                  //backgroundSize: 'cover',
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="bg-[url('/src/img/bg2.png')] bg-cover h-screen">
        <div className="  flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
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
            <h2>
              <Link
                to={"/search"}
                className=" sm:text-white/100 font-bold hover:underline"
              >
                Do Filter...
              </Link>
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-500 hover:text-violet-500 hover:underline"
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
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-500 hover:text-violet-500 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem list={listing} key={`sale_${listing._id}`} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
