"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import useSearchModal, { SearchQuery } from "../hooks/useSearchModal";
import categories from "@/data/categories";
import { Transition, TransitionStatus } from "react-transition-group";

const Categories = () => {
    const searchModal = useSearchModal();
    const [category, setCategory] = useState("");

    const _setCategory = (_category: string) => {
        setCategory(_category);

        const query: SearchQuery = {
            country: searchModal.query.country,
            checkIn: searchModal.query.checkIn,
            checkOut: searchModal.query.checkOut,
            guests: searchModal.query.guests,
            bedrooms: searchModal.query.bedrooms,
            bathrooms: searchModal.query.bathrooms,
            category: _category,
        };

        searchModal.setQuery(query);
    };

    useEffect(() => {
        console.log("category", category);
    }, [category]);

    //
    // Helper Functions  and States for carrousel
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        // console.log("currentIndex", currentIndex);
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, categories.length / 2 - 1));
        // console.log("currentIndex", currentIndex);
    };

    //
    // Transition
    const duration = 300;

    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
    };

    const transitionStyles: { [key in TransitionStatus]: React.CSSProperties } = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 },
        unmounted: {} as React.CSSProperties,
    };

    return (
        <div className="relative flex items-center">
            <Transition in={currentIndex !== 0} timeout={duration}>
                {(state) => (
                    <button
                        onClick={handlePrevClick}
                        className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md"
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state],
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}
            </Transition>

            <div className="overflow-hidden w-full">
                <div
                    className="flex transition-transform duration-500"
                    style={{
                        transform: `translateX(-${currentIndex * 89}px)`,
                    }}
                >
                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            onClick={() => _setCategory(cat.name)}
                            className={`my-3 pb-3 mx-2 mb-1 flex-shrink-0 flex flex-col items-center space-y-2 cursor-pointer border-b-2 ${
                                category == cat.name ? "border-black" : "border-white"
                            } opacity-60 hover:border-gray-200 hover:opacity-100`}
                            style={{ width: "89px" }}
                        >
                            <Image src={cat.imageSrc} alt={`Category - ${cat.displayName}`} width={25} height={25} />
                            <span className="text-xs whitespace-nowrap">{cat.displayName}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Transition in={currentIndex !== categories.length / 2 - 1} timeout={duration}>
                {(state) => (
                    <button
                        onClick={handleNextClick}
                        className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md"
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state],
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
            </Transition>
        </div>
    );
};

export default Categories;
