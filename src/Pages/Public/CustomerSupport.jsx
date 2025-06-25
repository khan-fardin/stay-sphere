import React, { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

const CustomerSupport = () => {

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "How do I book a room?",
            answer:
                "Simply click on the 'Book Now' button on any room card. You'll be redirected to the room's detail page where you can reserve it.",
        },
        {
            question: "Can I cancel my reservation?",
            answer:
                "Yes, you can cancel up to 24 hours before your booking date without any charge.",
        },
        {
            question: "Is there customer support if I face issues?",
            answer:
                "Absolutely. Our support team is available 24/7 via chat, phone, and email.",
        },
        {
            question: "Are utilities included in the rent?",
            answer:
                "Most listings include utilities, but it's best to check the room details or ask the host directly.",
        },
        {
            question: "How do I find a roommate?",
            answer:
                "You can browse shared room listings or use our roommate matching feature based on lifestyle preferences.",
        },
    ];

    return (
        <div>
            <section className="py-12 px-4 bg-primary-content">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-6">
                        Customer Support & FAQs
                    </h2>
                    <p className="text-center text-gray-600 mb-10">
                        Find answers to common questions or contact us directly for help.
                    </p>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-xl p-4 shadow-sm">
                                <button className="w-full flex justify-between items-center text-left"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span className="text-lg font-medium">{faq.question}</span>
                                    {openIndex === index ? (
                                        <BiChevronUp className="text-gray-500" />
                                    ) : (
                                        <BiChevronDown className="text-gray-500" />
                                    )}
                                </button>
                                {openIndex === index && (
                                    <p className="mt-3 text-gray-600 text-sm">{faq.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-700 mb-3">Still need help?</p>
                        {/* The button to open modal */}
                        <label htmlFor="my_modal_7" className="btn">Contact Support</label>

                        {/* Support Message */}
                        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                        <div className="modal" role="dialog">
                            <div className="modal-box">
                                <h3 className="text-lg font-bold">Hello!</h3>
                                <p className="py-4">Out Team Will Contact You Soon!</p>
                            </div>
                            <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CustomerSupport;