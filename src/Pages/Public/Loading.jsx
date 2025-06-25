import React from 'react';
import logo from '../../assets/logo.png';

const Loading = () => {
    return (
        <div className='flex items-center justify-center h-screen bg-accent-content'>
            <div>
                <img src={logo} alt="" className='w-10 animate-ping'/>
            </div>
        </div>
    );
};

export default Loading;