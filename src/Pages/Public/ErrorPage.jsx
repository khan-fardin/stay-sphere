import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='flex flex-col items-center'>
            <Helmet>
                <title>Oops!!</title>
            </Helmet>
            <img src="https://img.freepik.com/premium-psd/psd-404-page-found-error-icon-3d-rendering-vector-illustration_743950-1371.jpg?w=826" alt="404" className='w-1/2 mix-blend-multiply'/>
            <p className='font-medium text-lg'>Page Not Found!</p>
            <Link to='/' className='btn bg-primary-content my-5'>Go Back Home</Link>
        </div>
    );
};

export default ErrorPage;