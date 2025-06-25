import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Banner from '../../Components/Banner';
import FeaturedRooms from './featuredRooms';
import CustomerSupport from './CustomerSupport';
import WishListSection from './WishListSection';
import Map from '../../Components/Map';
import ReviewHomepage from '../../Components/ReviewHomepage';
import { BiChevronUp } from 'react-icons/bi';
import SpecialOffer from '../../Components/SpecialOffer';

const Home = () => {

  useEffect(() => {
    const toggleVisibility = () => {
      (window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <SpecialOffer />
      <Banner />
      <Map />
      <FeaturedRooms />
      <WishListSection />
      <ReviewHomepage />
      <CustomerSupport />

      {/* isVisible && */}

      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 p-3 bg-accent text-white rounded-full shadow-lg hover:bg-secondary transition"
        aria-label="Go to top"
      >
        <BiChevronUp size={20} />
      </button>
    </div>
  );
};

export default Home;