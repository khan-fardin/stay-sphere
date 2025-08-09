import { Helmet } from "react-helmet-async";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Contact = () => {

    const handleSubmit = e => {
        e.preventDefault();
        const name = e.target.name.value
        const email = e.target.email.value
        const message = e.target.message.value
        console.log(name, email, message)
        toast.success("Message Send", {
            position: "bottom-center"
        });
    };

    return (
        <div className="min-h-screen bg-base-100 py-10">
            {/* Helmet for SEO */}
            <Helmet>
                <title>Contact Us | Stay Sphere</title>
                <meta
                    name="description"
                    content="Get in touch with Stay Sphere for reservations, inquiries, or assistance."
                />
            </Helmet>

            <div className="max-w-6xl mx-auto px-4">
                {/* Heading */}
                <h1 className="text-4xl font-bold text-center mb-6">
                    Contact <span className="text-primary">Us</span>
                </h1>
                <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                    Have questions or need assistance with your booking? Our team is here to help you 24/7.
                </p>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <FaPhoneAlt className="text-primary text-2xl" />
                            <div>
                                <h2 className="text-lg font-semibold">Phone</h2>
                                <p className="text-gray-600">+880 0000-00000</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <FaEnvelope className="text-primary text-2xl" />
                            <div>
                                <h2 className="text-lg font-semibold">Email</h2>
                                <p className="text-gray-600">support@staysphere.com</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <FaMapMarkerAlt className="text-primary text-2xl" />
                            <div>
                                <h2 className="text-lg font-semibold">Location</h2>
                                <p className="text-gray-600">123 Mohakhali, Dhaka, Bangladesh</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="card bg-base-200 shadow-xl p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">Full Name</span>
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Your name"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your email"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">Message</span>
                                </label>
                                <textarea
                                    name="message"
                                    placeholder="Your message..."
                                    className="textarea textarea-bordered w-full"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary w-full">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
