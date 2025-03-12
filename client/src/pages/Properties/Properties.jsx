"use client";

import React, { useState, useRef, useEffect } from "react";
import { PuffLoader } from "react-spinners";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useSearchParams, useNavigate } from "react-router-dom";
import useProperties from "../../components/hooks/useProperties";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import Search from "@/components/Search/Search";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const serverURL = import.meta.env.VITE_SERVER_URL;

export default function Properties() {
  const { data, isError, isLoading } = useProperties();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Update searchQuery from URL parameters on mount and when they change
  useEffect(() => {
    const searchFromUrl = searchParams.get("search") || "";
    setSearchQuery(searchFromUrl);
  }, [searchParams]);

  // Ref object to hold references to each horizontal scroll container
  const scrollRefs = useRef({});

  // Define the locations you want separate sections for
  const areas = ["DFW", "Austin", "Houston", "San Antonio", "Other Areas"];

  // Scroll Left
  const handleScrollLeft = (area) => {
    const container = scrollRefs.current[area];
    if (container) {
      container.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Scroll Right
  const handleScrollRight = (area) => {
    const container = scrollRefs.current[area];
    if (container) {
      container.scrollBy({ left: 300, behavior: "smooth" });
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

  // Filter properties using OR logic across multiple fields
  const filteredData = data.filter((property) => {
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

  return (
    <div className="bg-[#FDF8F2] min-h-screen py-12 text-[#4b5b4d]">
      {/* Hero Section */}
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Title, Subtitle & Search */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Find Your Dream Property
          </h1>
          <p className="text-lg mb-6">
            Browse through a wide selection of properties with detailed filters
            to help you find the perfect fit.
          </p>
          <Search query={searchQuery} setQuery={setSearchQuery} />
        </div>

        {/* Small Separating Line */}
        <hr className="my-8 border-t border-[#4b5b4d]/20" />

        {/* Location Sections */}
        {areas.map((area) => {
          // Filter properties for the current area
          const areaProperties = filteredData.filter(
            (property) => property.area === area
          );
          // Skip section if no properties for that area
          if (areaProperties.length === 0) return null;

          return (
            <div key={area} className="my-12">
              {/* Section Title */}
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                Properties in {area}
              </h2>

              {/* Horizontal Slider Container */}
              <div className="relative">
                {/* Left Button */}
                <button
                  onClick={() => handleScrollLeft(area)}
                  className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow-md hover:shadow-lg"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>

                {/* Scrollable Row */}
                <div
                  className="overflow-x-auto overflow-y-hidden no-scrollbar px-2 py-4"
                  ref={(el) => (scrollRefs.current[area] = el)}
                >
                  <div className="flex space-x-6">
                    {areaProperties.map((card) => (
                      <div
                        key={card.id}
                        className="w-72 flex-shrink-0 my-2 md:my-4 transition hover:scale-105"
                      >
                        <PropertyCard card={card} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Button */}
                <button
                  onClick={() => handleScrollRight(area)}
                  className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow-md hover:shadow-lg"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}

        {/* No matching properties */}
        {filteredData.length === 0 && (
          <p className="text-center text-gray-600 py-4">
            No properties found.
          </p>
        )}
      </div>
    </div>
  );
}
