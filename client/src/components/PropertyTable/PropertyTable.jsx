"use client"; // If you’re using Next.js or a similar framework that supports "use client"

import React, { useState } from "react";
import { PuffLoader } from "react-spinners";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MoreVertical } from "lucide-react";

import useProperties from "../../components/hooks/useProperties";
import { formatPrice } from "@/utils/format";


// ShadCN UI components
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
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const serverURL = import.meta.env.VITE_SERVER_URL;

export default function Properties() {
const navigate = useNavigate();    
  const { data, isError, isLoading } = useProperties();
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    // Expand your search logic here if needed
  };

  // Error state
  if (isError) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <h2 className="text-red-600 text-xl font-semibold">
          Error fetching data.
        </h2>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <PuffLoader size={80} color="#404040" />
      </div>
    );
  }

  // Optional: Filter properties by the search query (basic example)
  const filteredData = data.filter((property) => {
    const query = searchQuery.toLowerCase();
    return (
      property.title?.toLowerCase().includes(query) ||
      property.city?.toLowerCase().includes(query) ||
      property.streetAddress?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-[#FDF8F2] min-h-screen py-12 text-[#4b5b4d]">
      {/* Hero / Header Section */}
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Title & Subtitle */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            All Properties
          </h1>
          <p className="text-lg mb-6">
            Browse through all Properties and filter through how you see fit.
          </p>
        </div>

        {/* Small Separating Line */}
        <hr className="my-8 border-t border-[#4b5b4d]/20" />

        {/* Main Table Section */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[70px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Max Offer</TableHead>
                <TableHead>Offers</TableHead>
                <TableHead>Created On</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((property) => {
                // Safely parse or use imageUrls array
                const images = property.imageUrls
                  ? Array.isArray(property.imageUrls)
                    ? property.imageUrls
                    : JSON.parse(property.imageUrls)
                  : [];
                const firstImage = images.length
                  ? `${serverURL}/${images[0]}`
                  : "/default-image.jpg";

                return (
                  <TableRow
                    key={property.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Thumbnail */}
                    <TableCell>
                      <img
                        src={firstImage}
                        alt={property.title || "Property"}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </TableCell>

                    {/* Title */}
                    <TableCell className="font-semibold">
                      {property.title ? (
                        <span
                          dangerouslySetInnerHTML={{ __html: property.title }}
                        />
                      ) : (
                        "Untitled Property"
                      )}
                    </TableCell>

                    {/* Address */}
                    <TableCell>
                      {property.streetAddress}, {property.city},{" "}
                      {property.state} {property.zip}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          property.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : property.status === "Expired"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {property.status || "N/A"}
                      </span>
                    </TableCell>

                    {/* Price */}
                    <TableCell>
                      ${formatPrice(property.askingPrice || 0)}
                    </TableCell>

                    {/* Views */}
                    <TableCell>{property.views || 0}</TableCell>

                    {/* Max Offer */}
                    <TableCell>
                      ${formatPrice(property.maxOffer || 0)}
                    </TableCell>

                    {/* Number of Offers */}
                    <TableCell>{property.numOffers || 0}</TableCell>

                    {/* Created On */}
                    <TableCell>
                      {new Date(property.createdAt).toLocaleDateString()}
                    </TableCell>

                    {/* Last Updated */}
                    <TableCell>
                      {new Date(property.updatedAt).toLocaleDateString()}
                    </TableCell>

                    {/* 3-Dot Menu (Dropdown) */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                           onClick={() => navigate(`/properties/${property.id}/offers`)}
                          >
                           Offer
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => navigate(`/edit-property/${property.id}`)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => console.log("Delete", property.id)}
                            className="text-red-600"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {/* If no matching properties after filtering */}
          {filteredData.length === 0 && (
            <p className="text-center text-gray-600 py-4">
              No properties found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
