import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router';

const FeaturedRooms = () => {

  const [data,setData]=useState([]);
  fetch('https://stay-sphere-server-ashen.vercel.app/rooms').then(res=>res.json()).then(data=>setData(data));

  const getAverageRating = (bookingDetails) => {
    const reviews = bookingDetails?.filter(r => typeof r.rating === "number") || [];
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return reviews.length ? (total / reviews.length).toFixed(1) : 0;
  };

  const topRooms = [...data]
    .sort((a, b) => getAverageRating(b.bookingDetails) - getAverageRating(a.bookingDetails))
    .slice(0, 6);

  return (
    <div>
      <section className="py-12 px-4 bg-primary-content text-primary">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Rooms</h2>

        <div className="overflow-x-auto flex">
          <div className="flex gap-6 min-w-max px-2">
            {topRooms.map((room) => (
              <div
                key={room._id}
                className="min-w-[300px] max-w-[300px] bg-base-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={room.images}
                  alt={room.name}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-base-content">{room.name}</h3>
                  <p className="text-base-content/70 text-sm mb-4">{room.description}</p>
                  <Link
                    to={`/rooms/room-details/${room._id}`}
                    className="btn btn-primary btn-sm rounded-xl"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Find More Button Section */}
          <div className="min-w-[300px] flex items-center justify-center px-4">
            <Link
              to="/rooms"
              className="flex flex-col items-center justify-center text-primary hover:text-primary-focus transition"
            >
              <FaArrowRight className="text-5xl mb-2" />
              <p className="font-semibold text-lg">Find More</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedRooms;