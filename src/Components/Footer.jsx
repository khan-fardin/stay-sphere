import React from 'react';
import logo from '../assets/logo.png'
import { FaSquareFacebook, FaSquareInstagram, FaSquareXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
                <aside>
                    <img src={logo} alt="" className='w-10' />
                    <div>
                        <h1 className='text-2xl font-black'>Stay Sphere</h1>
                        <br />
                        Providing reliable hotel since 1992
                    </div>
                </aside>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Hotel Reservations</a>
                    <a className="link link-hover">Reviews & Ratings</a>
                    <a className="link link-hover">Deals & Discounts</a>
                    <a className="link link-hover">Flexible Payment Options</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    {/* <a className="link link-hover">Press kit</a> */}
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    {/* Terms of Use */}
                    <button className="link link-hover" onClick={() => document.getElementById('my_modal_1').showModal()}>Terms of use</button>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-lg">Terms of use</h3>
                            <p className="py-4">
                                1 Booking & Payments
                                Users must provide accurate information when booking.

                                Prices are subject to change without notice.

                                Cancellation policies vary by hotel and will be displayed at checkout.
                                <br />
                                2 User Responsibilities
                                You must be at least 18 years old to book a hotel.

                                You agree not to use the website for illegal or fraudulent activities.

                                You are responsible for ensuring that your booking details are correct.
                                <br />
                                3 Limitation of Liability
                                [Your Website Name] is not responsible for hotel service quality, safety, or conditions.

                                We do not guarantee room availability beyond confirmed bookings.
                                <br />
                                4 Changes to Terms
                                We reserve the right to update these terms at any time. Continued use implies acceptance of modifications.</p>
                        </div>
                    </dialog>
                    {/* Privacy policy */}
                    <button className="link link-hover" onClick={() => document.getElementById('my_modal_2').showModal()}>Privacy policy</button>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-lg">Privacy policy</h3>
                            <p className="py-4">
                                1 Information We Collect
                                Personal details (name, email, payment details) for booking purposes.

                                Browsing and usage data for analytics and service improvement.
                                <br />
                                2 How We Use Your Information
                                To process bookings and payments securely.

                                To enhance your experience with personalized recommendations.

                                To comply with legal obligations.
                                <br />
                                3 Data Security
                                We implement encryption and security measures to protect user data.
                                <br />
                                4 Third-Party Sharing
                                We do not sell or share personal data, except with trusted partners required for payment processing or hotel reservations.
                                <br />
                                5 Your Rights
                                You can request access, modification, or deletion of your data.
                            </p>
                        </div>
                    </dialog>
                    {/* Cookie policy */}
                    <button className="link link-hover" onClick={() => document.getElementById('my_modal_3').showModal()}>Cookie policy</button>
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-lg">Cookie policy</h3>
                            <p className="py-4">
                                1 What Are Cookies?
                                Cookies are small files stored on your device that improve website functionality and user experience.
                                <br />
                                2 How We Use Cookies
                                To remember your preferences and login sessions.

                                For analytics to improve website performance.

                                For targeted promotions relevant to your interests.
                                <br />
                                3 Managing Cookies
                                You can disable cookies via your browser settings, though some features may be affected.
                            </p>
                        </div>
                    </dialog>
                </nav>
            </footer>

            <footer className="footer sm:footer-horizontal bg-base-200 text-base-content items-center p-4">
                <aside className="grid-flow-col items-center">
                    <img src={logo} alt="" className='w-5' />
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Stay Sphere</p>
                </aside>
                <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end text-3xl">
                    <a href='https://www.x.com/stay-sphere'>
                        <FaSquareXTwitter />
                    </a>
                    <a href='https://www.facebook.com/stay-sphere'>
                        <FaSquareFacebook />
                    </a>
                    <a href='https://www.instagram.com/stay-sphere'>
                        <FaSquareInstagram />
                    </a>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;