import React from 'react'
import { Link } from 'react-router-dom';
import { CiLocationArrow1 } from "react-icons/ci";

export default function Searchlistitem({list}) {
  return (
    <div className=' bg-red-500 hover:bg-sky-500 shadow-md  transition-shadow overflow-hidden rounded-xl w-full  sm:w-[330px]'>
    <Link to={`/listing/${list._id}`}>
      <img
        src={
          list.imageUrls[0]
        }
        alt='list cover'
        className='h-[320px] sm:h-[220px] w-full object-cover '
      />
      <div className='p-3 flex flex-col gap-2 w-full'>
        <p className='  text-lg font-semibold text-white'>
          {list.name}
        </p>
        <div className='flex items-center gap -1'>
          <CiLocationArrow1 className='h-4 w-4 text-red-700' />
          <p className='text-sm text-gray-100   w-full'>
            {list.address}
          </p>
        </div>
        <p className='text-sm text-pink-100'>
          {list.description}
        </p>
        <p className='text-pink-100 mt-2 '>
          ₹
          {list.offer
            ? list.discountPrice.toLocaleString('en-US')
            : list.regularPrice.toLocaleString('en-US')}
          {list.type === 'rent' && ' / month'}
        </p>
        <div className='text-white flex gap-4'>
          <div className='font-bold text-xs'>
            {list.bedrooms > 1
              ? `${list.bedrooms} beds `
              : `${list.bedrooms} bed `}
          </div>
          <div className='font-bold text-xs'>
            {list.bathrooms > 1
              ? `${list.bathrooms} baths `
              : `${list.bathrooms} bath `}
          </div>
        </div>
      </div>
    </Link>
  </div>
  )
}
