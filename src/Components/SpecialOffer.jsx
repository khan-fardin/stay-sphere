import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const SpecialOffer = () => {
  const [show, setShow] = useState(false);

  // Show modal after slight delay on first load
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-10 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl relative animate-fade-in-up">
        <button
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          <IoClose size={24} />
        </button>
        <img
          src="https://img.freepik.com/premium-vector/exclusive-offer-label-flat-badge_686319-811.jpg?w=826" // Replace with your promo image
          alt="Special Offer"
          className="rounded-t-2xl w-full h-52 object-cover"
        />
        <div className="p-5 text-center">
          <h2 className="text-2xl font-bold text-orange-600 mb-2">🎉Stay Tuned and get Special Offer!</h2>
          <p className="text-gray-700 mb-4">
            Get <span className="text-red-600 font-semibold">50% OFF</span> from the next season.
          </p>
          <button
            onClick={() => setShow(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
