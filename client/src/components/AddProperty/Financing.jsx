"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function Financing({ formData, handleChange }) {
  return (
    <Card className="border border-gray-200 shadow-sm rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Financing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Financing Availability */}
        <div>
          <Label className="text-sm font-semibold text-gray-700">Financing Option</Label>
          <Select
            name="financing"
            value={formData.financing}
            onValueChange={(value) => handleChange({ target: { name: "financing", value } })}
          >
            <SelectTrigger className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]">
              <SelectValue placeholder="Select financing availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Not-Available">Not Available</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-1">
            Choose whether financing is an option for this property.
          </p>
        </div>

        {formData.financing === "Available" && (
          <div className="space-y-6">
            {/* Down Payment */}
            <div>
              <Label className="text-sm font-semibold text-gray-700">Down Payment</Label>
              <Input
                type="text"
                placeholder="Enter down payment"
                name="downPayment"
                value={formData.downPayment}
                onChange={handleChange}
                className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">
                Initial payment required before financing starts.
              </p>
            </div>

            {/* Monthly Payment */}
            <div>
              <Label className="text-sm font-semibold text-gray-700">Monthly Payment</Label>
              <Input
                type="text"
                placeholder="Enter monthly payment"
                name="monthlyPayment"
                value={formData.monthlyPayment}
                onChange={handleChange}
                className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">
                The amount to be paid each month under financing terms.
              </p>
            </div>

            {/* Terms (in months) */}
            <div>
              <Label className="text-sm font-semibold text-gray-700">Loan Terms (Months)</Label>
              <Input
                type="text"
                placeholder="Enter loan duration"
                name="terms"
                value={formData.terms}
                onChange={handleChange}
                className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">
                Total number of months the financing will last.
              </p>
            </div>

            {/* Interest Rate */}
            <div>
              <Label className="text-sm font-semibold text-gray-700">Interest Rate (%)</Label>
              <Input
                type="text"
                placeholder="Enter interest rate"
                name="interestRate"
                value={formData.interestRate}
                onChange={handleChange}
                className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">
                The percentage of interest applied to the financing.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
