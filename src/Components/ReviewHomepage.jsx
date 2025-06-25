import React, { useState, useEffect } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ReviewHomepage = () => {

  const [luxuryReviews, setLuxuryReviews] = useState([]);
  fetch('https://stay-sphere-server-ashen.vercel.app/latest-reviews')
    .then(res => res.json())
    .then(data => setLuxuryReviews(data));

  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setReviews(luxuryReviews);
    setLoading(false);
  }, [luxuryReviews]);

  const nextReview = () => {
    setCurrentIndex(prev => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevReview = () => {
    setCurrentIndex(prev => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 text-neutral">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          Guest Testimonials
        </h2>
        No reviews available yet
      </div>
    );
  }

  return (
    <section className="py-12 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          Guest Testimonials
        </h2>

        <div className="max-w-4xl mx-auto relative">
          <div className="carousel w-full">
            {reviews.map((review, index) => (
              <div
                key={index}
                id={`review-${index}`}
                className={`carousel-item relative w-full ${index === currentIndex ? 'block' : 'hidden'}`}
              >
                <div className="bg-base-100 p-8 rounded-box shadow-xl">
                  <div className="flex flex-col md:flex-row items-center mb-6 gap-4">
                    <div className="avatar">
                      <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={review.avatar ? review.avatar : 'https://img.freepik.com/premium-psd/blank-profile-picture-with-circle-blue-psd-transparent-background_609989-5235.jpg?w=740'} alt={review.userName} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-neutral">{review.user}</h3>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`${i < review.rating ? 'text-amber-400' : 'text-gray-300'} text-lg`}
                          />
                        ))}
                        <span className="ml-2 text-neutral-focus">
                          {(review.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-lg italic text-content">
                    "{review.comment}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>

          {/* right left control */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prevReview}
              className="btn btn-circle btn-primary"
              aria-label="Previous review"
            >
              <FaChevronLeft />
            </button>
            <div className="flex gap-2 items-center">
              {reviews.map((_, index) => (
                <a
                  key={index}
                  href={`#review-${index}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-gray-300'}`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextReview}
              className="btn btn-circle btn-primary"
              aria-label="Next review"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewHomepage;