import React, { useEffect, useState } from "react";
import Searchlistitem from "./Searchlistitem";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";

export default function AdminReview() {
  const [reviews, setReviews] = useState([]);
  const [showReviewsError, setShowReviewsError] = useState(false);

  const handleGetReviews = async () => {
    try {
      const res = await fetch(`/backend/listing/get-reviews`);
      const data = await res.json();

      if (data.success) {
        setReviews(data.reviews);
      } else {
        setShowReviewsError(true);
      }
    } catch (error) {
      setShowReviewsError(true);
    }
  };

  const handleDeleteReview = async (listingId, reviewId) => {
    try {
      const res = await fetch(`/backend/listing/delete-review/${listingId}/${reviewId}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.status === 200) {
        setReviews(prevReviews => prevReviews.filter(review => review._id !== reviewId));
      } else {
        setShowReviewsError(true);
      }
    } catch (error) {
      setShowReviewsError(true);
    }
  };

  useEffect(() => {
    handleGetReviews();
  }, []);

  return (
    <div className="pl-64 ">
      <div className="mt-8 pb-40 flex flex-col mx-40">
        <h2 className="text-center text-2xl p-5 font-semibold text-white">Reviews</h2>
        <div className="-m-1.5 overflow-x-auto">
          <div className="relative overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-left">
              <thead className="text-xs bg-white uppercase">     
                <tr>
                  <th scope="col" className="px-6 py-3 uppercase">Name</th>
                  <th scope="col" className="px-6 py-3 uppercase">Rating</th>
                  <th scope="col" className="px-6 py-3 uppercase">Comment</th>
                  <th scope="col" className="px-6 py-3 text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="border rounded-3xl">
                {reviews.map((review) => (
                  <tr key={review._id} className="bg-gradient-to-r from-orange-200 to-cyan-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-blue-800">{review.name}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-800">Rating: {review.rating}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-800">{review.comment}</p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <button onClick={() => handleDeleteReview(review.listingId, review._id)} className="px-3 py-1 text-red-700 uppercase cursor-pointer">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {showReviewsError && <p className="text-center mt-4 text-red-500">Error loading reviews.</p>}
      </div>
    </div>);
}
