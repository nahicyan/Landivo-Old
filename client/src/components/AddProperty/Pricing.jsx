"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Pricing({ formData, handleChange }) {
  return (
    <Card className="border border-gray-200 shadow-sm rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Pricing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Asking Price */}
        <div>
          <Label className="text-sm font-semibold text-gray-700">Asking Price</Label>
          <Input
            type="text"
            placeholder="Enter asking price"
            name="askingPrice"
            value={formData.askingPrice}
            onChange={handleChange}
            className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
          />
          <p className="text-xs text-gray-500 mt-1">
            The initial price you're listing the property for.
          </p>
        </div>

        {/* Discount Price */}
        <div>
          <Label className="text-sm font-semibold text-gray-700">Discount Price</Label>
          <Input
            type="text"
            placeholder="Enter discount price"
            name="disPrice"
            value={formData.disPrice}
            onChange={handleChange}
            className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
          />
          <p className="text-xs text-gray-500 mt-1">
            The special price available for logged in buyers.
          </p>
        </div>

        {/* Minimum Price */}
        <div>
          <Label className="text-sm font-semibold text-gray-700">Minimum Price</Label>
          <Input
            type="text"
            placeholder="Enter minimum price"
            name="minPrice"
            value={formData.minPrice}
            onChange={handleChange}
            className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
          />
          <p className="text-xs text-gray-500 mt-1">
            The lowest amount you are willing to accept for this property.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
