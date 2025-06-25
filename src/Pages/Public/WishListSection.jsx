import React, { useEffect, useState } from 'react';

const WishListSection = () => {

    const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || []);
    const [input, setInput] = useState("");

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addDestination = (e) => {
        e.preventDefault();
        if (input.trim() !== "") {
            setWishlist([...wishlist, input.trim()]);
            setInput("");
        }
    };

    return (
        <div>
            <section className="py-12 px-4 bg-base-100 text-base-content">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-6">Travel Wishlist</h2>
                    <p className="text-center mb-8 text-lg">
                        Dreaming of new destinations? Add them to your wishlist.
                    </p>

                    {/* Add Wishlist Form */}
                    <form
                        onSubmit={addDestination}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
                    >
                        <input
                            type="text"
                            placeholder="Add a place (e.g., Kyoto, Iceland)"
                            className="input input-bordered w-full max-w-xs bg-base-200 text-base-content"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">
                            Add
                        </button>
                    </form>

                    {/* Wishlist Display */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {wishlist.length === 0 ? (
                            <p className="text-center col-span-full text-gray-400">
                                Your wishlist is empty. Start dreaming!
                            </p>
                        ) : (
                            wishlist.map((item, index) => (
                                <div key={index} className="card bg-base-200 shadow-xl">
                                    <div className="card-body">
                                        <h3 className="card-title">{item}</h3>
                                        <p className="text-sm text-base-content/70">Future trip idea</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WishListSection;