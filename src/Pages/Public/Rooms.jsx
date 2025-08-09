import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { CiDumbbell } from 'react-icons/ci';
import { FaBed, FaParking, FaStar, FaSwimmingPool } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { MdLocalBar } from 'react-icons/md';
import { motion } from "motion/react"
import { Link, useLoaderData } from 'react-router';
import Loading from './Loading';

const Rooms = () => {

    const data = useLoaderData();

    const [rooms, setRooms] = useState(data);
    const [sort, setSort] = useState("default");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        let sortedRooms = [...data];

        setTimeout(() => {
            if (sort === "high") {
                sortedRooms.sort((a, b) => b.pricePerNight - a.pricePerNight);
            } else if (sort === "low") {
                sortedRooms.sort((a, b) => a.pricePerNight - b.pricePerNight);
            }
            setRooms(sortedRooms);
            setLoading(false); // stop loading
        }, 300);
    }, [sort, data]);

    // if(loading)return <Loading/>

    return (
        <div>
            <Helmet>
                <title>Rooms</title>
            </Helmet>

            <h1 className='text-2xl font-black text-center my-5'>Find Rooms</h1>

            {/* filter system */}
            <label className="select">
                <span className="label">Sort By</span>
                <select onChange={(e) => setSort(e.target.value)} value={sort}>
                    <option value="default">Default</option>
                    <option value="high">Price High to Low</option>
                    <option value="low">Price Low to High</option>
                </select>
            </label>

            {loading ? (
                <Loading />
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-10 gap-5'>{
                    rooms.map(room => <Link to={`room-details/${room._id}`} key={room._id}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.0 }} className='p-3 bg-accent-content rounded-2xl w-fit mx-auto'>
                            <img src={room.images} alt="" className='rounded-lg w-[300px] h-[200px]' />
                            <div className='py-3 space-y-2.5'>
                                <p className='flex items-center gap-2 text-lg font-medium'>
                                    <FaStar className='text-orange-400' />
                                    {
                                        (() => {
                                            const reviews = room.bookingDetails?.filter(r => r.rating !== undefined) || [];
                                            const avg = reviews.length
                                                ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                                                : 0;
                                            return (
                                                <>
                                                    {avg} <span className='opacity-50'>({reviews.length} Reviews)</span>
                                                </>
                                            );
                                        })()
                                    }
                                </p>

                                <h1 className='text-xl font-medium h-[50px]'>{room.name}</h1>
                                <p className='flex items-center gap-2 font-medium opacity-50'><FaBed className='text-red-500' />{room.bedType}</p>
                                <div>
                                    <div className='border-b border-dashed'></div>
                                    <div className='border-b border-dashed'></div>
                                </div>
                                <h1 className='font-bold text-2xl'>{room.pricePerNight}$<span className='opacity-50 text-xl'>/night</span></h1>
                            </div>
                        </motion.div></Link>)}
                </div>
            )}
        </div>
    );
};

export default Rooms;