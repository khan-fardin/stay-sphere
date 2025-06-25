import {
    FaStar, FaWifi, FaTv, FaCoffee, FaConciergeBell, FaSwimmingPool, FaSpa,
    FaBed,
    FaPenAlt,
} from "react-icons/fa";
import { PiHairDryer } from "react-icons/pi";
import { MdAcUnit, MdRestaurant, MdBusinessCenter, MdCoffeeMaker, MdBalcony, MdLocalBar, MdMiscellaneousServices, MdFireplace, MdOutlinePets } from "react-icons/md";
import { GiBarbecue, GiMeal } from "react-icons/gi";
import { Suspense, use, useEffect, useState } from "react";
import { FaCity, FaMountain, FaPeopleRoof } from "react-icons/fa6";
import { IoMdResize } from "react-icons/io";
import { BiFridge } from "react-icons/bi";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { Helmet } from "react-helmet";
import { Bounce, toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../Public/Loading";

const RoomDetails = () => {

    const { user } = use(AuthContext);
    const { id } = useParams();
    // const room = useLoaderData();
    const [room, setRoom] = useState(null);
    const [selectDate, setSelectDate] = useState("");
    const [showBookingModal, setShowBookingModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://stay-sphere-server-ashen.vercel.app/rooms/${id}`, {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            },
        }).then(res => res.json()).then(data => setRoom(data));
    }, [id, user]);

    if (!room) return <Loading />;

    const disabledDates = room.bookingDetails.map(d => d.bookingDate);
    const roomBookEmail = room.bookingDetails.find(d => d.email === user.email);
    const reviews = room.bookingDetails?.filter(r => r.rating !== undefined) || [];
    const averageRating = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
    const dates = [];
    if (selectDate) {
        dates.push(new Date(selectDate).toISOString().split("T")[0]);
    };
    const nights = dates.length;
    const date = dates[0];

    const dateSelector = e => {
        const date = e.target.value;
        if (disabledDates.includes(date)) {
            // alert('This date is not available');
            toast.warn('This date is not available!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            return;
        };

        setSelectDate(date);
    };
    const handleBooking = () => {

        setShowBookingModal(false);

        const booking = {
            name: user.displayName,
            email: user.email,
            bookingDate: date,
        };

        fetch(`https://stay-sphere-server-ashen.vercel.app/rooms/${room._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    toast.success('Booked this room successfully!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                };

                navigate('/my-bookings');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
    };

    return (
        <div className="min-h-screen bg-base-200 text-base-content">

            <Helmet>
                <title>Room Details</title>
            </Helmet>

            {/* Hero */}
            <div
                className="hero h-96 relative"
                style={{
                    backgroundImage: `url(${room.images})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">{room.name}</h1>
                        <p className="mb-5 text-xl">{room.description}</p>
                        <div className="flex justify-center items-center gap-2">
                            <FaStar className="text-amber-400" />
                            <span>{averageRating || 0} ({reviews.length} reviews)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main */}
            <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Info */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Room Facilities */}
                    <div className="bg-base-100 p-8 rounded-box shadow-lg">
                        <h2 className="text-3xl font-bold mb-6">Room Facilities</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex items-center gap-3">
                                <FaBed className="text-3xl text-amber-600" />
                                <div>
                                    <h3 className="font-semibold">Bed Type</h3>
                                    <p className="text-sm opacity-80">{room.bedType}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaPeopleRoof className="text-3xl text-amber-600" />
                                <div>
                                    <h3 className="font-semibold">Max Guests</h3>
                                    <p className="text-sm opacity-80">{room.maxGuests}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <IoMdResize className="text-3xl text-amber-600" />
                                <div>
                                    <h3 className="font-semibold">Room Size</h3>
                                    <p className="text-sm opacity-80">{room.size}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="bg-base-100 p-8 rounded-box shadow-lg">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                            <FaConciergeBell className="text-amber-600" />
                            Room Amenities
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {room.amenities.map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    {item === "Free Wi-Fi" && <FaWifi className="text-amber-600" />}
                                    {item === "Smart TV" && <FaTv className="text-amber-600" />}
                                    {item === "Coffee Maker" && <MdCoffeeMaker className="text-amber-600" />}
                                    {item === "Air Conditioning" && <MdAcUnit className="text-amber-600" />}
                                    {item === "Hair Dryer" && <PiHairDryer className="text-amber-600" />}
                                    {item === "Private Balcony" && <MdBalcony className="text-amber-600" />}
                                    {item === "Mini Bar" && <MdLocalBar className="text-amber-600" />}
                                    {item === "Room Service" && <MdMiscellaneousServices className="text-amber-600" />}
                                    {item === "Workspace" && <FaPenAlt className="text-amber-600" />}
                                    {item === "City View" && <FaCity className="text-amber-600" />}
                                    {item === "Mini Fridge" && <BiFridge className="text-amber-600" />}
                                    {item === "Fireplace" && <MdFireplace className="text-amber-600" />}
                                    {item === "BBQ Grill" && <GiBarbecue className="text-amber-600" />}
                                    {item === "Mountain View" && <FaMountain className="text-amber-600" />}
                                    {item === "Pet Friendly" && <MdOutlinePets className="text-amber-600" />}
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reviews */}
                    <div className="bg-base-100 p-8 rounded-box shadow-lg">
                        <h2 className="text-3xl font-bold mb-6">Guest Reviews</h2>
                        {reviews.length > 0 ? (
                            <div className="space-y-6">
                                {reviews.map((review, index) => (
                                    <div key={index} className="border-b border-base-300 pb-6 last:border-0">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-amber-400 flex items-center gap-1">
                                                    {Array.from({ length: review.rating }).map((_, i) => (
                                                        <FaStar key={i} />
                                                    ))}
                                                </p>
                                            </div>
                                            <span className="text-sm opacity-70">{review.commentDate}</span>
                                        </div>
                                        <p className="mt-2 italic">"{review.comment}"</p>
                                        <p className="text-sm mt-2 font-semibold">— {review.name}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-lg italic opacity-70">No reviews yet for this room.</p>
                        )}
                    </div>
                </div>

                {/* Booking */}
                <div className="lg:col-span-1">
                    <div className="bg-base-100 p-8 rounded-box shadow-lg sticky top-8">
                        <h2 className="text-3xl font-bold mb-6">Booking Details</h2>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between">
                                <span className="font-semibold">Price per night:</span>
                                <span className="text-2xl font-bold text-amber-600">${room.pricePerNight}</span>
                            </div>

                            {room.breakfastIncluded && (
                                <div className="flex items-center gap-2 text-emerald-500">
                                    <GiMeal />
                                    <span>Breakfast included</span>
                                </div>
                            )}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Select Date</span>
                                </label>
                                <input
                                    type="date"
                                    className="input input-bordered w-full"
                                    value={selectDate}
                                    onChange={dateSelector}
                                    min={new Date().toISOString().split("T")[0]}
                                />
                            </div>
                        </div>
                        <button
                            className="btn btn-primary w-full tooltip"
                            onClick={() => setShowBookingModal(true)}
                            disabled={!selectDate || roomBookEmail?.email == user.email}
                        >
                            {roomBookEmail?.email ? 'Already Booked By You' : 'Book Now'}
                        </button>
                        <div className="mt-6 text-sm space-y-2">
                            <div className="flex justify-between">
                                <span>Taxes:</span>
                                <span>12.5%</span>
                            </div>
                            <div className="divider"></div>
                            <div className="flex justify-between font-bold">
                                <span>Total (est.):</span>
                                <span>${(room.pricePerNight * 1.125 * nights).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {showBookingModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-2xl">
                        <h3 className="font-bold text-2xl mb-6">Confirm Your Booking</h3>
                        <div className="bg-base-200 p-6 rounded-lg mb-6">
                            <h4 className="font-bold text-xl mb-4">{room.name}</h4>
                            <div className="flex justify-between mb-2">
                                <span>Booking Date:</span>
                                <span className="font-semibold">{selectDate}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Price per night:</span>
                                <span className="font-semibold">${room.pricePerNight}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Tax:</span>
                                <span className="font-semibold">12.5%</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total:</span>
                                <span>${(room.pricePerNight * 1.125 * nights).toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="modal-action">
                            <button className="btn" onClick={() => setShowBookingModal(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" onClick={handleBooking}>
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomDetails;
