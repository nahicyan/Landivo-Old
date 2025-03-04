"use client";

import React from "react";

export default function Dimension({ formData, handleChange }) {

    return (

        <div className="w-full flex-shrink-0 p-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Property Size & Dimensions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Square Footage (sqft)"
            name="sqft"
            value={formData.sqft}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
          />
          <input
            type="text"
            placeholder="Acre"
            name="acre"
            value={formData.acre}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>
      </div>

    );
}
