import { set } from "mongoose";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import "swiper/css/bundle";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const [reviewData, setReviewData] = useState({
    name: "",
    rating: "",
    comment: "",
  });
 
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser._id, listing?.userRef);
  
  const fetchListing = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/backend/listing/get/${params.listingId}`);
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        console.log("error");
        setError(true);
        setLoading(false);
        return;
      }
      console.log("data");
      setListing(data);
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
 

  useEffect(() => {
    fetchListing();
  }, [params.listingId]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/backend/listing/add-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listingId: params.listingId,
          userId: currentUser._id,
          name: reviewData.name,
          rating: reviewData.rating,
          comment: reviewData.comment,
        }),
      });
      const data = await response.json();
      console.log(data); // handle success or error response here
      // Refresh listing data after adding the review
      fetchListing();
      // Reset review form data
      setReviewData({
        name: "",
        rating: "",
        comment: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(loading);
  return (
   
   <main className=" ">
      <ul className="text-blue-800 font-semibold text-lg flex flex-wrap items-center gap-2 sm:gap-6   p-9 pb-10">
          <li className="flex items-center gap-1 whitespace-nowrap">
          <div className="">
    {/* Left column content */}
    {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
    {error && (
      <p className="text-center my-7 text-2xl">There is some error</p>
    )}
    {listing && !loading && !error && (
      <div className="">
       
        {/* <Swiper navigation>
        
          {listing.imageUrls.map((url) => (
            <SwiperSlide key={url}>
              <div
                className="h-[500px] w-[500px] "
                style={{
                  background: `url(${url}) center no-repeat`,
                   backgroundSize: 'cover',
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper> */}

        <div className="fixed top-[13%] right-[3%] z-10 border  w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
          <FaShare
            className="text-slate-500"
            onClick={handleCopyLink}/>
        </div>
        {copied && (
          <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
            Link copied!
          </p>
        )}
      </div>
    )}
  </div>

          </li>
         
         
        </ul>

  
  <div className=" ">
    {/* Right column content */}
    {listing && !loading && !error && (
       
      <div className="max-w-4xl mx-auto p-8 my-7 gap-4  rounded-xl border-gray-300 ">
         <ul className="text-blue-800 bg-white font-semibold text-lg flex flex-wrap items-center gap-6 sm:gap-6 border  rounded-lg p-9 ">
          <li className="flex items-center gap-1 whitespace-nowrap">
          <img src={listing.imageUrls[0]}  />
      
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap">
           
            <img src={listing.imageUrls[1]}  />
      
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap">
          <img src={listing.imageUrls[2]}  />
      
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap">
          <img src={listing.imageUrls[3]}  />
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap">
          <img src={listing.imageUrls[4]}  />
          </li> <li className="flex items-center gap-1 whitespace-nowrap">
          <img src={listing.imageUrls[5]}  />
          </li>
        </ul>

        <div className="text-5xl font-semibold border border-gray-300 bg-slate-200 rounded-lg m-5 p-5">
       
          <p className="text-pink-700 ">
        
            {listing.name} - ₹{" "}
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}{" "}
            OFF
          </p>
        </div>

        <p className="text-slate-800 bg-orange-100 border border-gray-300 rounded-xl m-5 p-4">
        <p className="flex items-center mt-6 gap-2 text-red-500 text-2xl">
        <img src={listing.imageUrls[3]}  />
          <FaMapMarkerAlt className="text-blue-700" />
          {listing.address}
        </p>
        <div className="flex gap-4">
          <p className="bg-pink-800 text-2xl w-full max-w-[200px] text-white text-center p-1 rounded-md">
            {listing.type === "rent" ? "For Rent" : "For Sale"}
          </p>
          {listing.offer && (
            <p className="bg-pink-900 w-full text-2xl max-w-[200px] text-white text-center p-1 rounded-md">
              PRICE:- ₹{listing.regularPrice - listing.discountPrice}
            </p>
          )}
        </div>
        
          <span className="font-semibold text-red-900 text-2xl">
            Description -{" "}
          </span>
          <p className="text-xl font-semibold text-slate-500">
            {listing.description}
          </p>
          <ul className="text-blue-800 font-semibold text-lg flex flex-wrap items-center gap-4 sm:gap-6  p-9">
          <li className="flex items-center gap-1 whitespace-nowrap">
            <FaBed className="text-5xl" />
            {listing.bedrooms > 1
              ? `${listing.bedrooms} beds `
              : `${listing.bedrooms} bed `}
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap">
            <FaBath className="text-5xl" />
            {listing.bathrooms > 1
              ? `${listing.bathrooms} baths `
              : `${listing.bathrooms} bath `}
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap">
            <FaParking className="text-5xl" />
            {listing.parking ? "Parking spot" : "No Parking"}
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap">
            <FaChair className="text-5xl" />
            {listing.furnished ? "Furnished" : "Unfurnished"}
          </li>
        </ul>
        <p className="text-slate-800  border-gray-300 rounded-xl p-4 flex justify-center items-center">
  {(!currentUser ||
    (currentUser && listing.userRef !== currentUser._id)) &&
    !contact && (
      <button
        onClick={() => setContact(true)}
        className="text-slate-800 bg-blue-200 border border-gray-300 rounded-xl p-5"
      >
        Contact Owner
      </button>
    )}
</p>
        {contact && <Contact listing={listing} />}
       
        </p>
        
        {/* {currentUser && (
              <form onSubmit={handleSubmit} className="mt-8">
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={reviewData.name}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-2 rounded-md"
                  />
                  <select
                    name="rating"
                    value={reviewData.rating}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-2 rounded-md"
                  >
                    <option value="">Select Rating</option>
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Very Good</option>
                    <option value="3">3 - Good</option>
                    <option value="2">2 - Fair</option>
                    <option value="1">1 - Poor</option>
                  </select>
                  <textarea
                    name="comment"
                    placeholder="Your Review"
                    value={reviewData.comment}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-2 rounded-md h-32 resize-none"
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-blue-700 text-slate-100 py-2 px-4 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
*/}
{currentUser && (
  <form onSubmit={handleSubmit} className="mt-8">
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-2">
        {[...Array(5)].map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleChange({
              target: {
                name: 'rating',
                value: (index + 1).toString()
              }
            })}
            className={`text-2xl ${
              index < reviewData.rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </button>
        ))}
      </div>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={reviewData.name}
        onChange={handleChange}
        required
        className="border border-gray-300 p-2 rounded-md w-64 text-center"
      />
      <textarea
        name="comment"
        placeholder="Your Review"
        value={reviewData.comment}
        onChange={handleChange}
        required
        className="border border-gray-300 p-2 rounded-md h-32 resize-none w-64"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-700 text-slate-100 py-2 px-4 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
      >
        Submit Review
      </button>
    </div>
  </form>
)}

        <div className="mt-8 pb-40"> 
              <h2 className="text-2xl text-gray-100 font-semibold">Reviews</h2>
              {listing.reviews.map((review) => (
                <div key={review._id} className="border border-gray-300 rounded-md p-4 mt-4">
                  <p className="text-lg text-white font-semibold">{review.name}</p>
                  <p className="text-sm text-pink-100">Rating: {review.rating}</p>
                  <p className="text-blue-100">{review.comment}</p>
                </div>
              ))}
            </div>

      </div>
    )}
    
  </div>
</main>

    
  );
}


// import { set } from "mongoose";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore from "swiper";
// import { Navigation } from "swiper/modules";
// import {
//   FaBath,
//   FaBed,
//   FaChair,
//   FaMapMarkedAlt,
//   FaMapMarkerAlt,
//   FaParking,
//   FaShare,
// } from "react-icons/fa";
// import "swiper/css/bundle";
// import { useSelector } from "react-redux/es/hooks/useSelector";
// import Contact from "../components/Contact";

// export default function Listing() {
//   SwiperCore.use([Navigation]);
//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [contact, setContact] = useState(false);
//   const params = useParams();
//   const { currentUser } = useSelector((state) => state.user);
//   console.log(currentUser._id, listing?.userRef);
//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/backend/listing/get/${params.listingId}`);
//         const data = await res.json();
//         console.log(data);
//         if (data.success === false) {
//           console.log("error");
//           setError(true);
//           setLoading(false);
//           return;
//         }
//         console.log("data");
//         setListing(data);
//         setLoading(false);
//         setError(false);
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//       }
//     };
//     fetchListing();
//   }, [params.listingId]);
//   console.log(loading);
//   return (
//     <main className="">
//       {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
//       {error && (
//         <p className="text-center my-7 text-2xl">There is some error </p>
//       )}
//       {listing && !loading && !error && (
//         <div className="pb-2">
//           <Swiper navigation>
//             {listing.imageUrls.map((url) => (
//               <SwiperSlide key={url}>
//                 <div
//                   className="h-[500px]"
//                   style={{
//                     background: `url(${url}) center no-repeat`,
//                     // backgroundSize: 'cover',
//                   }}
//                 >   </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
//             <FaShare
//               className="text-slate-500"
//               onClick={() => {
//                 navigator.clipboard.writeText(window.location.href);
//                 setCopied(true);
//                 setTimeout(() => {
//                   setCopied(false);
//                 }, 2000);
//               }}
//             />
//           </div>
//           {copied && (
//             <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
//               Link copied!
//             </p>
//           )}
//           <div className="flex flex-col max-w-4xl mx-auto p-8 my-7 gap-4 border rounded-xl border-gray-300 ">
//             <div className="text-5xl font-semibold border border-gray-300 bg-slate-200 rounded-lg p-4">
//               <p className="text-pink-700 ">
//                 {" "}
//                 {listing.name} - ₹{" "}
//                 {listing.offer
//                   ? listing.discountPrice.toLocaleString("en-US")
//                   : listing.regularPrice.toLocaleString("en-US")}{" "}
//                 OFF
                
//               </p>
//             </div>

//             <p className="flex items-center mt-6 gap-2 text-pink-100  text-lg ">
//               <FaMapMarkerAlt className="text-blue-700" />
//               {listing.address}
//             </p>
//             <div className="flex gap-4">
//               <p className="bg-pink-800 w-full max-w-[200px] text-white text-center p-1 rounded-md">
//                 {listing.type === "rent" ? "For Rent" : "For Sale"}
//               </p>
//               {listing.offer && (
//                 <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
//                   PRICE:- ₹{listing.regularPrice - listing.discountPrice}
//                 </p>
//               )}
//             </div>
//             <p className="text-slate-800 bg-blue-100 border border-gray-300 rounded-xl p-4">
//               <span className="font-semibold text-red-900 text-2xl">
//                 Description -{" "}
//               </span>
//               <p className="text-xl font-semibold text-slate-500">
//                 {listing.description}
//               </p>
//             </p>
//             <ul className="text-blue-800 font-semibold text-lg flex flex-wrap items-center gap-4 sm:gap-6  border border-gray-300 bg-slate-200 rounded-lg p-9">
//               <li className="flex items-center gap-1 whitespace-nowrap ">
//                 <FaBed className="text-5xl" />
//                 {listing.bedrooms > 1
//                   ? `${listing.bedrooms} beds `
//                   : `${listing.bedrooms} bed `}
//               </li>
//               <li className="flex items-center gap-1 whitespace-nowrap ">
//                 <FaBath className="text-5xl" />
//                 {listing.bathrooms > 1
//                   ? `${listing.bathrooms} baths `
//                   : `${listing.bathrooms} bath `}
//               </li>
//               <li className="flex items-center gap-1 whitespace-nowrap ">
//                 <FaParking className="text-5xl" />
//                 {listing.parking ? "Parking spot" : "No Parking"}
//               </li>
//               <li className="flex items-center gap-1 whitespace-nowrap ">
//                 <FaChair className="text-5xl" />
//                 {listing.furnished ? "Furnished" : "Unfurnished"}
//               </li>
//             </ul>
//              {/* {currentUser && listing.userRef !== currentUser._id && !contact && (  
//               <button
//                 onClick={() => setContact(true)}
//                 className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-10"
//               >
//                 Contact Owner
//               </button>
//             )}  */}
//             {(!currentUser || (currentUser && listing.userRef !== currentUser._id)) && !contact && (
//   <button
//     onClick={() => setContact(true)}
//     className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-10"
//   >
//     Contact Owner
//   </button>
// )}
//             {contact && <Contact listing={listing} />}
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }




// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore from "swiper";
// import { Navigation } from "swiper/modules";
// import {
//   FaBath,
//   FaBed,
//   FaChair,
//   FaMapMarkerAlt,
//   FaParking,
//   FaShare,
// } from "react-icons/fa";
// import "swiper/css/bundle";
// import { useSelector } from "react-redux/es/hooks/useSelector";
// import Contact from "../components/Contact";

// export default function Listing() {
//   SwiperCore.use([Navigation]);
//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [contact, setContact] = useState(false);
//   const params = useParams();
//   const { currentUser } = useSelector((state) => state.user);

//   const fetchListing = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`/backend/listing/get/${params.listingId}`);
//       const data = await res.json();
//       if (data.success === false) {
//         setError(true);
//       } else {
//         setListing(data);
//       }
//     } catch (error) {
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchListing();
//   }, [params.listingId]);

//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(window.location.href);
//     setCopied(true);
//     setTimeout(() => {
//       setCopied(false);
//     }, 2000);
//   };

//   return (
//   //   <main className="flex">
//   //   <div className="flex-1">
//   //     {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
//   //     {error && <p className="text-center my-7 text-2xl">There is some error</p>}
//   //     {listing && !loading && !error && (
//   //       <div>
//   //         <Swiper navigation>
//   //           {listing.imageUrls.map((url) => (
//   //             <SwiperSlide key={url}>
//   //               <div className="h-[500px]" style={{ background: `url(${url}) center no-repeat` }} />
//   //             </SwiperSlide>
//   //           ))}
//   //         </Swiper>
//   //         <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
//   //           <FaShare className="text-slate-500" onClick={handleCopyLink} />
//   //         </div>
//   //         {copied && (
//   //           <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
//   //             Link copied!
//   //           </p>
//   //         )}
//   //       </div>
//   //     )}
//   //   </div>

//   //   <div className="flex-1">
//   //     {listing && !loading && !error && (
//   //       <div className="max-w-4xl mx-auto p-8 my-7 gap-4 border rounded-xl border-gray-300">
//   //         <div className="text-5xl font-semibold border border-gray-300 bg-slate-200 rounded-lg p-4">
//   //           <p className="text-pink-700 ">
//   //             {listing.name} - ₹{' '}
//   //             {listing.offer
//   //               ? listing.discountPrice.toLocaleString('en-US')
//   //               : listing.regularPrice.toLocaleString('en-US')}{' '}
//   //             OFF
//   //           </p>
//   //         </div>

//   //         <p className="flex items-center mt-6 gap-2 text-pink-100 text-lg">
//   //           <FaMapMarkerAlt className="text-blue-700" />
//   //           {listing.address}
//   //         </p>
//   //         <div className="flex gap-4">
//   //           <p className="bg-pink-800 w-full max-w-[200px] text-white text-center p-1 rounded-md">
//   //             {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
//   //           </p>
//   //           {listing.offer && (
//   //             <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
//   //               PRICE: ₹{listing.regularPrice - listing.discountPrice}
//   //             </p>
//   //           )}
//   //         </div>
//   //         <p className="text-slate-800 bg-blue-100 border border-gray-300 rounded-xl p-4">
//   //           <span className="font-semibold text-red-900 text-2xl">Description - </span>
//   //           <p className="text-xl font-semibold text-slate-500">{listing.description}</p>
//   //         </p>
//   //         <ul className="text-blue-800 font-semibold text-lg flex flex-wrap items-center gap-4 sm:gap-6 border border-gray-300 bg-slate-200 rounded-lg p-9">
//   //           <li className="flex items-center gap-1 whitespace-nowrap">
//   //             <FaBed className="text-5xl" />
//   //             {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
//   //           </li>
//   //           <li className="flex items-center gap-1 whitespace-nowrap">
//   //             <FaBath className="text-5xl" />
//   //             {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
//   //           </li>
//   //           <li className="flex items-center gap-1 whitespace-nowrap">
//   //             <FaParking className="text-5xl" />
//   //             {listing.parking ? 'Parking spot' : 'No Parking'}
//   //           </li>
//   //           <li className="flex items-center gap-1 whitespace-nowrap">
//   //             <FaChair className="text-5xl" />
//   //             {listing.furnished ? 'Furnished' : 'Unfurnished'}
//   //           </li>
//   //         </ul>
//   //         <div>
//   //           <AddCommentForm listingId={listing._id} fetchList={fetchListing} />
//   //         </div>
//   //         {(!currentUser || (currentUser && listing.userRef !== currentUser._id)) && !contact && (
//   //           <button
//   //             onClick={() => setContact(true)}
//   //             className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-10"
//   //           >
//   //             Contact Owner
//   //           </button>
//   //         )}
//   //         {contact && <Contact listing={listing} />}
//   //       </div>
//   //     )}
//   //   </div>
//   // </main>
//   <main className="flex flex-col lg:flex-row">
//   <div className="lg:flex-1">
//     {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
//     {error && <p className="text-center my-7 text-2xl">There is some error</p>}
//     {listing && !loading && !error && (
//       <div>
//         <Swiper navigation>
//           {listing.imageUrls.map((url) => (
//             <SwiperSlide key={url}>
//               <div className="h-[500px]" style={{ background: `url(${url}) center no-repeat` }} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//         <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
//           <FaShare className="text-slate-500" onClick={handleCopyLink} />
//         </div>
//         {copied && (
//           <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
//             Link copied!
//           </p>
//         )}
//       </div>
//     )}
//   </div>

//   <div className="lg:flex-1">
//     {listing && !loading && !error && (
//       <div className="max-w-4xl mx-auto p-8 my-7 gap-4 border rounded-xl border-gray-300">
//         <div className="text-5xl font-semibold border border-gray-300 bg-slate-200 rounded-lg p-4">
//           <p className="text-pink-700 ">
//             {listing.name} - ₹{' '}
//             {listing.offer
//               ? listing.discountPrice.toLocaleString('en-US')
//               : listing.regularPrice.toLocaleString('en-US')}{' '}
//             OFF
//           </p>
//         </div>

//         <p className="flex items-center mt-6 gap-2 text-pink-100 text-lg">
//           <FaMapMarkerAlt className="text-blue-700" />
//           {listing.address}
//         </p>
//         <div className="flex flex-col lg:flex-row gap-4">
//           <p className="bg-pink-800 w-full lg:w-auto max-w-[200px] text-white text-center p-1 rounded-md">
//             {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
//           </p>
//           {listing.offer && (
//             <p className="bg-red-900 w-full lg:w-auto max-w-[200px] text-white text-center p-1 rounded-md">
//               PRICE: ₹{listing.regularPrice - listing.discountPrice}
//             </p>
//           )}
//         </div>
//         <p className="text-slate-800 bg-blue-100 border border-gray-300 rounded-xl p-4">
//           <span className="font-semibold text-red-900 text-2xl">Description - </span>
//           <p className="text-xl font-semibold text-slate-500">{listing.description}</p>
//         </p>
//         <ul className="text-blue-800 font-semibold text-lg flex flex-wrap items-center gap-4 sm:gap-6 border border-gray-300 bg-slate-200 rounded-lg p-9">
//           <li className="flex items-center gap-1 whitespace-nowrap">
//             <FaBed className="text-5xl" />
//             {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
//           </li>
//           <li className="flex items-center gap-1 whitespace-nowrap">
//             <FaBath className="text-5xl" />
//             {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
//           </li>
//           <li className="flex items-center gap-1 whitespace-nowrap">
//             <FaParking className="text-5xl" />
//             {listing.parking ? 'Parking spot' : 'No Parking'}
//           </li>
//           <li className="flex items-center gap-1 whitespace-nowrap">
//             <FaChair className="text-5xl" />
//             {listing.furnished ? 'Furnished' : 'Unfurnished'}
//           </li>
//         </ul>
//         {/* <div>
//           <AddCommentForm listingId={listing._id} fetchList={fetchListing} />
//           </div>*/} 
//         {(!currentUser || (currentUser && listing.userRef !== currentUser._id)) && !contact && ( 
//           <button
//             onClick={() => setContact(true)}
//             className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-10"
//           >
//             Contact Owner
//           </button>
//         )}
//         {contact && <Contact listing={listing} />}
//       </div>
//     )}
//   </div>
// </main>

//   );
// }

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore from "swiper";
// import { Navigation } from "swiper/modules";
// import {
//   FaBath,
//   FaBed,
//   FaChair,
//   FaMapMarkerAlt,
//   FaParking,
//   FaShare,
// } from "react-icons/fa";
// import "swiper/css/bundle";
// import { useSelector } from "react-redux/es/hooks/useSelector";
// import Contact from "../components/Contact";

// export default function Listing() {
//   SwiperCore.use([Navigation]);
//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [contact, setContact] = useState(false);
//   const params = useParams();
//   const { currentUser } = useSelector((state) => state.user);

//   const fetchListing = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`/backend/listing/get/${params.listingId}`);
//       const data = await res.json();
//       if (data.success === false) {
//         setError(true);
//       } else {
//         setListing(data);
//       }
//     } catch (error) {
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchListing();
//   }, [params.listingId]);

//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(window.location.href);
//     setCopied(true);
//     setTimeout(() => {
//       setCopied(false);
//     }, 2000);
//   };

//   return (
  
//   <main className="flex flex-col lg:flex-row">
//   <div className="lg:flex-1">
//     {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
//     {error && <p className="text-center my-7 text-2xl">There is some error</p>}
//     {listing && !loading && !error && (
//       <div>
//         <Swiper navigation>
//           {listing.imageUrls.map((url) => (
//             <SwiperSlide key={url}>
//               <div className="h-[500px]" style={{ background: `url(${url}) center no-repeat` }} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//         <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
//           <FaShare className="text-slate-500" onClick={handleCopyLink} />
//         </div>
//         {copied && (
//           <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
//             Link copied!
//           </p>
//         )}
//       </div>
//     )}
//   </div>

//   <div className="lg:flex-1 ">
//     {listing && !loading && !error && (
//       <div className="max-w-4xl mx-auto p-8 my-7 gap-4 border rounded-xl border-gray-300">
//         <div className="text-5xl font-semibold border border-gray-300 bg-blue-100 rounded-lg p-4">
//           <p className="text-pink-700  ">
//             {listing.name} - ₹{' '}
//             {listing.offer ? (
//   <p className="text-pink-700">
//     {listing.discountPrice.toLocaleString('en-US')} OFF
//     <span className="text-sm text-gray-500 line-through">
//       {' '}{listing.regularPrice.toLocaleString('en-US')}
//     </span>
//   </p>
// ) : (
//   <p className="text-pink-700">
//     {listing.regularPrice.toLocaleString('en-US')}
//   </p>
// )}
//           </p>
//         </div>

//         <p className="flex items-center mt-6 gap-2 text-pink-100  text-lg">
//           <FaMapMarkerAlt className="text-blue-700" />
//           {listing.address}
//         </p>
//         <div className="flex flex-col lg:flex-row gap-4">
//           <p className="bg-pink-800 w-full lg:w-auto max-w-[200px] text-white text-center p-1 rounded-md">
//             {listing.type === 'sale' ? 'For Sale' : 'For Sale'}
//           </p>
//           {listing.offer && (
//             <p className="bg-red-900 w-full lg:w-auto max-w-[200px] text-white text-center p-1 rounded-md">
//               PRICE: ₹{listing.regularPrice - listing.discountPrice}
//             </p>
//           )}
//         </div>
//         <p className="text-slate-800 bg-blue-100 border  rounded-xl p-4">
//           <span className="font-semibold text-red-900 text-2xl">Description - </span>
//           <p className="text-xl font-semibold text-slate-500">{listing.description}</p>
//         </p>
//         <ul className="text-blue-800 font-semibold text-lg flex flex-wrap items-center gap-4 sm:gap-6 border border-gray-300 bg-blue-100 rounded-lg p-9">
//           <li className="flex items-center gap-1 whitespace-nowrap">
//             <FaBed className="text-5xl" />
//             {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
//           </li>
//           <li className="flex items-center gap-1 whitespace-nowrap">
//             <FaBath className="text-5xl" />
//             {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
//           </li>
//           <li className="flex items-center gap-1 whitespace-nowrap">
//             <FaParking className="text-5xl" />
//             {listing.parking ? 'Parking spot' : 'No Parking'}
//           </li>
//           <li className="flex items-center gap-1 whitespace-nowrap">
//             <FaChair className="text-5xl" />
//             {listing.furnished ? 'Furnished' : 'Unfurnished'}
//           </li>
//         </ul>
       
//         {(!currentUser || (currentUser && listing.userRef !== currentUser._id)) && !contact && ( 
//           <button
//             onClick={() => setContact(true)}
//             className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-10"
//           >
//             Contact Owner
//           </button> 
//         )}
//         {contact && <Contact listing={listing} />}
//       </div>
//     )}
//   </div>
// </main>

//   );
// }
