"use client";

import React, { useState, useRef } from "react";
import { PuffLoader } from "react-spinners";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import useProperties from "@/components/hooks/useProperties";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import SearchArea from "@/components/SearchArea/SearchArea";
import { Button } from "@/components/ui/button";

export default function OtherLandsProperty() {
  const { data, isError, isLoading } = useProperties();
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef(null);

  // Optional: Handle Search submission (if needed)
  const handleSearch = (e) => {
    e.preventDefault();
  };

  // Error State
  if (isError) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <h2 className="text-red-600 text-xl font-semibold">
          Error fetching properties.
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

  // Filter properties to only include those in OtherLands
  const OtherLandsProperties = data.filter(
    (property) => property.area === "Other Areas"
  );

  // Further filter using the search query across multiple fields
  const filteredOtherLandsProperties = OtherLandsProperties.filter((property) => {
    const query = searchQuery.toLowerCase();
    return (
      property.title?.toLowerCase().includes(query) ||
      property.streetAddress?.toLowerCase().includes(query) ||
      property.state?.toLowerCase().includes(query) ||
      property.zip?.toLowerCase().includes(query) ||
      property.area?.toLowerCase().includes(query) ||
      property.apnOrPin?.toLowerCase().includes(query) ||
      property.ltag?.toLowerCase().includes(query) ||
      property.rtag?.toLowerCase().includes(query) ||
      property.city?.toLowerCase().includes(query) ||
      property.county?.toLowerCase().includes(query)
    );
  });

  // Determine which properties to display:
  // If there are any filtered OtherLands properties, display them;
  // otherwise, fallback to showing all properties.
  const displayProperties =
    filteredOtherLandsProperties.length > 0 ? filteredOtherLandsProperties : data;

  // Set header text based on whether we're showing just OtherLands or all properties
  const headerText =
    filteredOtherLandsProperties.length > 0
      ? "Properties in Other Areas"
      : "All Properties";

  // Handlers for horizontal scrolling
  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#FDF8F2] min-h-screen py-12 text-[#4b5b4d]">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Title, Subtitle & Search */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {headerText}
          </h1>
          <p className="text-lg mb-6">
            {filteredOtherLandsProperties.length > 0
              ? "Browse through properties available in the Other Areas area."
              : (
                <>
                  Sorry! We sold through everything in Other Areas! <br />
                  Maybe you would be interested in these properties:
                </>
              )}
          </p>
          {/* Use the reusable SearchArea component */}
          <SearchArea
            query={searchQuery}
            setQuery={setSearchQuery}
            placeholder="Search by title, address, state, zip, area, APN, tags, city, or county"
          />
        </div>

        {displayProperties.length > 0 ? (
          // Display properties in a horizontal slider
          <div className="relative">
            {/* Left Scroll Button */}
            <button
              onClick={handleScrollLeft}
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow-md hover:shadow-lg"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>

            {/* Scrollable Row */}
            <div
              className="overflow-x-auto overflow-y-hidden no-scrollbar px-2 py-4"
              ref={scrollRef}
            >
              <div className="flex space-x-20">
                {displayProperties.map((card) => (
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
          // Fallback: Display a message if no properties exist (unlikely since fallback is all properties)
          <p className="text-center text-gray-600 py-4">
            No properties found.
          </p>
        )}

        {/* "All Properties" Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => {
              window.location.href = "/properties";
            }}
            className="inline-block bg-black hover:bg-[#FF5C00] text-white font-semibold py-3 px-6 rounded-full shadow transition-colors"
          >
            All Properties
          </button>
        </div>
      </div>
    </div>
  );
}
