import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
        <div className='md:mx-[5%]'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;