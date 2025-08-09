import { Helmet } from "react-helmet-async";
import { FaHotel, FaMapMarkerAlt, FaConciergeBell } from "react-icons/fa";
import { Link } from "react-router";

const About = () => {
    return (
        <div className="min-h-screen bg-base-100 py-10">
            {/* Helmet for SEO */}
            <Helmet>
                <title>About Us | Stay Sphere</title>
                <meta
                    name="description"
                    content="Learn more about Stay Sphere, your trusted partner for luxurious and comfortable stays around the world."
                />
            </Helmet>

            <div className="max-w-6xl mx-auto px-4">
                {/* Heading */}
                <h1 className="text-4xl font-bold text-center mb-6">
                    About <span className="text-primary">Stay Sphere</span>
                </h1>
                <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                    At Stay Sphere Hotels, we believe every journey deserves a perfect stay.
                    From luxury suites to cozy getaways, we make booking your dream trip easy, secure, and unforgettable.
                </p>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="card bg-base-200 shadow-xl p-6 text-center">
                        <FaHotel className="text-5xl text-primary mx-auto mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Luxury Hotels</h2>
                        <p className="text-gray-600">
                            Choose from a curated list of luxury hotels with world-class amenities.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="card bg-base-200 shadow-xl p-6 text-center">
                        <FaMapMarkerAlt className="text-5xl text-primary mx-auto mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Prime Locations</h2>
                        <p className="text-gray-600">
                            Stay in the heart of the action, near popular landmarks and attractions.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="card bg-base-200 shadow-xl p-6 text-center">
                        <FaConciergeBell className="text-5xl text-primary mx-auto mb-4" />
                        <h2 className="text-xl font-semibold mb-2">24/7 Service</h2>
                        <p className="text-gray-600">
                            Enjoy round-the-clock concierge service to make your stay stress-free.
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <Link
                        to="/rooms"
                        className="btn btn-primary text-lg px-8"
                    >
                        Explore Our Rooms
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default About;
