"use client";

import React from "react";

export default function Utilities({ formData, handleChange }) {

    return (

        <div className="w-full flex-shrink-0 p-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Utilities, Infrastructure & Environmental Factors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <select
            name="water"
            value={formData.water}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
          >
            <option value="">Water</option>
            {[
              "Available",
              "Unavailable",
              "Well Needed",
              "Unknown",
              "Active Well",
            ].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            name="sewer"
            value={formData.sewer}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
          >
            <option value="">Sewer</option>
            {[
              "Available",
              "Unavailable",
              "Septic Needed",
              "Unknown",
              "Active Septic",
            ].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            name="electric"
            value={formData.electric}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
          >
            <option value="">Electric</option>
            {["Available", "Unavailable", "Unknown", "On Property"].map(
              (option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              )
            )}
          </select>
          <select
            name="roadCondition"
            value={formData.roadCondition}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
          >
            <option value="">Road Condition</option>
            {["Paved Road", "Dirt Road", "No Access", "Gravel"].map(
              (option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              )
            )}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
          <select
            name="floodplain"
            value={formData.floodplain}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
          >
            <option value="">Floodplain</option>
            {[
              "Yes",
              "No",
              "100-Year Floodplain",
              "100-Year Floodway",
              "Coastal-100 Year Floodplain",
              "Coastal 100 Year Floodway",
              "100-Year Partial Floodplain",
              "500 Year-Floodplain",
              "Wetlands",
            ].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

    );
}
