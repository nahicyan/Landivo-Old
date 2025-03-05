"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import UserSubmit from "@/components/AddProperty/UserSubmit"; 

export default function SystemInfoCard({ formData, handleChange }) {
  return (
    <Card className="mb-6 shadow-sm border border-gray-200 w-full">
      <CardHeader>
        <CardTitle>System Information</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Please fill out the following details.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
              {/* Render the User Email Display */}
              <UserSubmit />

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

        {/* Area Selection */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="area" className="text-gray-700 font-semibold">
            Area
          </Label>
          <Select
            name="area"
            value={formData.area}
            onValueChange={(value) => handleChange({ target: { name: "area", value } })}
          >
            <SelectTrigger className="w-full border-gray-300 focus:border-[#324c48] focus:ring-1 focus:ring-[#324c48]">
              <SelectValue placeholder="Select Area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DFW">DFW</SelectItem>
              <SelectItem value="Austin">Austin</SelectItem>
              <SelectItem value="Houston">Houston</SelectItem>
              <SelectItem value="San Antonio">San Antonio</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Selection */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="status" className="text-gray-700 font-semibold">
            Status
          </Label>
          <Select
            name="status"
            value={formData.status}
            onValueChange={(value) => handleChange({ target: { name: "status", value } })}
          >
            <SelectTrigger className="w-full border-gray-300 focus:border-[#324c48] focus:ring-1 focus:ring-[#324c48]">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Sold">Sold</SelectItem>
              <SelectItem value="Not Available">Not Available</SelectItem>
              <SelectItem value="Testing">Testing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
