"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Classification({ formData, handleChange }) {
  return (
    <Card className="border border-gray-200 shadow-sm rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Property Classification & Features
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* First Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* Type (disabled) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Type
            </label>
            <input
              type="text"
              value="Land"
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-600"
            />
          </div>

          {/* Zoning */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Zoning
            </label>
            <select
              name="zoning"
              value={formData.zoning}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select</option>
              {[
                "Residential",
                "Commercial",
                "Industrial",
                "Agricultural",
                "Mixed-Use",
                "Institutional",
                "Recreational",
                "Conservation",
                "Timberland",
                "Waterfront",
                "Vacant",
                "Undeveloped",
                "Specialty",
              ].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Restrictions */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Restrictions
            </label>
            <select
              name="restrictions"
              value={formData.restrictions}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select</option>
              {[
                "No Known Restriction(s)",
                "Zoning",
                "Deed",
                "Environmental",
                "Easement",
                "Setback",
              ].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Survey */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Survey
            </label>
            <select
              name="survey"
              value={formData.survey}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select</option>
              {["Available", "Not Available"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Separate Rows for Direction and Legal Description */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Direction
          </label>
          <input
            type="text"
            name="direction"
            value={formData.direction}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Legal Description
          </label>
          <input
            type="text"
            name="legalDescription"
            value={formData.legalDescription}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Mobile Home Friendly */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mobile Home Friendly
            </label>
            <select
              name="mobileHomeFriendly"
              value={formData.mobileHomeFriendly}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select</option>
              {["Yes", "No", "Verify"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* HOA / POA */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              HOA / POA
            </label>
            <select
              name="hoaPoa"
              value={formData.hoaPoa}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select</option>
              {["Yes", "No"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Conditionally Render HOA Fee & Terms */}
        {formData.hoaPoa === "Yes" && (
          <>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                HOA Fee
              </label>
              <input
                type="text"
                name="hoaFee"
                value={formData.hoaFee}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                HOA Payment Terms
              </label>
              <select
                name="hoaPaymentTerms"
                value={formData.hoaPaymentTerms}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select</option>
                {["Anually", "Semi-Anually", "Quarterly", "Monthly"].map(
                  (option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  )
                )}
              </select>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
