"use client";

import React from "react";

export default function Financing({ formData, handleChange }) {

    return (

        <div className="w-full flex-shrink-0 p-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Financing</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <select
            name="financing"
            value={formData.financing}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
          >
            <option value="">Financing</option>
            {["Available", "Not-Available"].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {formData.financing === "Available" && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
            <input
              type="text"
              placeholder="Down Payment"
              name="downPayment"
              value={formData.downPayment}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
            />
            <input
              type="text"
              placeholder="Monthly Payment"
              name="monthlyPayment"
              value={formData.monthlyPayment}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
            />
            <input
              type="text"
              placeholder="Terms (In Months)"
              name="terms"
              value={formData.terms}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
            />
            <input
              type="text"
              placeholder="Interest Rate"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
            />
          </div>
        )}
      </div>

    );
}
