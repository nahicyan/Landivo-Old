import React, { useState, useRef } from "react";
import { PuffLoader } from "react-spinners";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import useProperties from "../../components/hooks/useProperties";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

export default function Properties() {
  const { data, isError, isLoading } = useProperties();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Ref object for horizontal scrolling in the DFW slider
  const scrollRef = useRef(null);

  // Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    // Add search logic if desired
  };

  // Scroll Left for DFW slider
  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Scroll Right for DFW slider
  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Error State
  if (isError) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <h2 className="text-red-600 text-xl font-semibold">
          Error fetching data.
        </h2>
      </div>
    );
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <PuffLoader size={80} color="#404040" />
      </div>
    );
  }

  // Filter to only show DFW properties
  const dfwProperties = data.filter((property) => property.area === "DFW");

  return (
    <div className="bg-[#FDF8F2] min-h-screen py-12 text-[#4b5b4d]">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Title & Subtitle */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {dfwProperties.length > 0 ? "Properties in DFW" : "Hot Deals Move Fast!"}
          </h1>
          <p className="text-lg mb-6">
            {dfwProperties.length > 0
              ? "Browse through properties available in the DFW area."
              : "Maybe you would be interested in these properties:"}
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center bg-white rounded-full shadow-md p-2 transition hover:shadow-lg">
              <input
                type="text"
                placeholder="Search by location, price, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow px-4 py-2 text-gray-700 rounded-full focus:outline-none"
              />
              <button
                type="submit"
                className="bg-black hover:bg-[#FF5C00] text-white px-5 py-2 rounded-full mt-2 sm:mt-0 sm:ml-2 transition-colors"
              >
                <MagnifyingGlassIcon className="w-5 h-5 inline-block" />
              </button>
            </div>
          </form>
        </div>

        {dfwProperties.length > 0 ? (
          // Display DFW properties in a horizontal slider
          <div className="relative">
            {/* Left Scroll Button */}
            <button
              onClick={handleScrollLeft}
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow-md hover:shadow-lg"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>

            {/* Scrollable DFW Row */}
            <div
              className="overflow-x-auto overflow-y-hidden no-scrollbar px-2 py-4"
              ref={scrollRef}
            >
              <div className="flex space-x-6">
                {dfwProperties.map((card) => (
                  <div
                    key={card.id}
                    className="w-72 flex-shrink-0 transition hover:scale-105"
                  >
                    <PropertyCard card={card} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Scroll Button */}
            <button
              onClick={handleScrollRight}
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow-md hover:shadow-lg"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        ) : (
          // Fallback: Show all properties if no DFW properties are available
          <div className="flex flex-wrap justify-center gap-6">
            {data.map((card) => (
              <div
                key={card.id}
                className="w-72 flex-shrink-0 transition hover:scale-105"
              >
                <PropertyCard card={card} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
