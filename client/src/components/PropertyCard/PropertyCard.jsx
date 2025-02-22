import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "../../utils/format";
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function SlickPropertyCard({ card }) {
  const navigate = useNavigate();


  // If card.imageUrls is already an array, use it; otherwise try to parse it
  const images = card.imageUrls
    ? Array.isArray(card.imageUrls)
      ? card.imageUrls
      : JSON.parse(card.imageUrls)
    : [];
  const firstImage =
    images.length > 0 ? `${serverURL}/${images[0]}` : "/default-image.jpg";

  return (
    <Card
      onClick={() => navigate(`../properties/${card.id}`)}
      className="
        w-[350px]
        rounded-2xl
        overflow-hidden
        shadow-lg
        hover:shadow-2xl
        transition-all
        cursor-pointer
        bg-white
        backdrop-blur-lg
        border border-gray-200
      "
    >
      {/* Top Image Section */}
      <div className="relative">
        <img
          src={firstImage}
          alt="Property"
          className="w-full h-56 object-cover rounded-t-2xl"
        />

        {/* Left Tag */}
        {card.ltag && (
          <span className="absolute top-3 left-3 bg-[#d03c0b] text-white text-xs px-3 py-1 rounded-full shadow-md">
            {card.ltag}
          </span>
        )}

        {/* Right Tag */}
        {card.rtag && (
          <span className="absolute top-3 right-3 bg-[#3c5d58] text-white text-xs px-3 py-1 rounded-full shadow-md">
            {card.rtag}
          </span>
        )}
      </div>

      {/* Content Section (Compact) */}
      <CardContent className="p-3">
        {/* Price and Acre */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-gray-600 text-base font-normal">
            {card.acre} Acres
          </span>
          <span className="text-[#517b75] text-lg font-semibold">
            ${formatPrice(card.askingPrice)}
          </span>
        </div>

        {/* Address */}
        <p className="text-base font-semibold text-gray-800">
          {card.streetAddress || "123 Main St Apt #1"}
        </p>
        <p className="text-xs text-gray-500">
          {card.city}, {card.state} {card.zip}
        </p>
      </CardContent>
    </Card>
  );
}
