import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaArrowRight, FaPause, FaPlay } from 'react-icons/fa6';

const Banner = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Luxury-themed slides
    const slides = [
        {
            id: 1,
            title: "Luxury Redefined",
            description: "Experience unparalleled comfort in our exquisite suites, designed for the discerning traveler.",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            buttonText: "Explore Suites"
        },
        {
            id: 2,
            title: "Caramel Retreat",
            description: "Indulge in our warm, inviting spaces that blend modern luxury with cozy elegance.",
            image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            buttonText: "View Rooms"
        },
        {
            id: 3,
            title: "Your Sanctuary Awaits",
            description: "Discover a haven of tranquility with our premium amenities and personalized service.",
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            buttonText: "Book Now"
        }
    ];

    // Auto-advance slides
    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, slides.length]);

    const nextSlide = () => {
        setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div>
            <div className="relative w-full h-[70vh] max-h-[800px] overflow-hidden">
                {/* Slides */}
                <div
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide) => (
                        <div
                            key={slide.id}
                            className="w-full flex-shrink-0 relative h-full"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: `url(${slide.image})`,
                                    backgroundColor: '#111', // Fallback color
                                }}
                            >
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/30"></div>

                                {/* Loading State */}
                                {!slide.image && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                                        <span className="loading loading-spinner loading-lg text-primary"></span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="relative h-full flex items-center">
                                <div className="container mx-auto px-6 text-white">
                                    <div className="max-w-2xl backdrop-blur-sm bg-black/30 p-8 rounded-box border border-white/10">
                                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
                                            {slide.title}
                                        </h1>
                                        <p className="text-lg md:text-xl mb-8 animate-fade-in [animation-delay:100ms]">
                                            {slide.description}
                                        </p>
                                        <Link
                                            to="/rooms"
                                            className="btn btn-primary btn-lg hover:btn-accent transition-all animate-fade-in [animation-delay:200ms]"
                                        >
                                            {slide.buttonText}
                                            <FaArrowRight className="ml-2" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle btn-glass hover:bg-white/20 transition-all z-10"
                    aria-label="Previous slide"
                >
                    <FaChevronLeft className="text-xl" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle btn-glass hover:bg-white/20 transition-all z-10"
                    aria-label="Next slide"
                >
                    <FaChevronRight className="text-xl" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-primary w-6' : 'bg-white/50 hover:bg-white/70'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Play/Pause Button */}
                <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="absolute bottom-8 right-8 btn btn-sm btn-glass hover:bg-white/20 transition-all z-10"
                    aria-label={isAutoPlaying ? "Pause slider" : "Play slider"}
                >
                    {isAutoPlaying ? (
                        <FaPause className="text-sm" />
                    ) : (
                        <FaPlay className="text-sm" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default Banner;