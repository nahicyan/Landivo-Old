"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SystemInfoCard({ formData, handleChange, nextStep }) {
  return (
    <Card className="mb-6 shadow-sm border border-gray-200 w-full">
      <CardHeader>
        <CardTitle>System Information</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Please fill out the following details.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Owner ID */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="ownerId" className="text-gray-700 font-semibold">
            Owner ID
          </Label>
          <Input
            id="ownerId"
            name="ownerId"
            value={formData.ownerId}
            onChange={handleChange}
            placeholder="Enter Owner ID"
          />
        </div>

        {/* Area */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="area" className="text-gray-700 font-semibold">
            Area
          </Label>
          <select
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="
              border
              rounded-md
              px-3 py-2
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-[#324c48]
            "
          >
            <option value="">Select Area</option>
            <option value="DFW">DFW</option>
            <option value="Austin">Austin</option>
            <option value="Houston">Houston</option>
            <option value="San Antonio">San Antonio</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Status */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="status" className="text-gray-700 font-semibold">
            Status
          </Label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="
              border
              rounded-md
              px-3 py-2
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-[#324c48]
            "
          >
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Pending">Pending</option>
            <option value="Sold">Sold</option>
            <option value="Not Available">Not Available</option>
            <option value="Testing">Testing</option>
          </select>
        </div>
      </CardContent>
    </Card>
  );
}
