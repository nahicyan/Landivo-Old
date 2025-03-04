"use client";

import React from "react";

export default function Pricing({ formData, handleChange }) {
  return (
    <div className="w-full flex-shrink-0 p-4">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Pricing</h3>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Asking Price"
          name="askingPrice"
          value={formData.askingPrice}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
        />
        <input
          type="text"
          placeholder="Minimum Price"
          name="minPrice"
          value={formData.minPrice}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
        />
        <input
          type="text"
          placeholder="Discount Price"
          name="disPrice"
          value={formData.disPrice}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
        />
      </div>
    </div>
  );
}
