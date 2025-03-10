"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function Financing({ formData, handleChange }) {
  return (
    <Card className="border border-gray-200 shadow-sm rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Financing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Financing Option */}
        <div>
          <Label className="text-sm font-semibold text-gray-700">
            Financing Option
          </Label>
          <Select
            name="financing"
            value={formData.financing}
            onValueChange={(value) =>
              handleChange({ target: { name: "financing", value } })
            }
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
            {/* Purchase Price */}
            <div>
              <Label className="text-sm font-semibold text-gray-700">
                Purchase Price
              </Label>
              <Input
                type="text"
                placeholder="Enter purchase price"
                name="purchasePrice"
                value={formData.purchasePrice}
                onChange={handleChange}
                className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">
                Total property purchase price.
              </p>
            </div>

            {/* Financed Price */}
            <div>
              <Label className="text-sm font-semibold text-gray-700">
                Financed Price
              </Label>
              <Input
                type="text"
                placeholder="Enter financed price"
                name="financedPrice"
                value={formData.financedPrice}
                onChange={handleChange}
                className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">
                The amount to be financed.
              </p>
            </div>

            {/* Tax */}
            <div>
              <Label className="text-sm font-semibold text-gray-700">
                Tax
              </Label>
              <Input
                type="text"
                placeholder="Enter tax amount"
                name="tax"
                value={formData.tax}
                onChange={handleChange}
                className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">
                Property tax amount.
              </p>
            </div>

            {/* HOA Due */}
            <div>
              <Label className="text-sm font-semibold text-gray-700">
                HOA Due
              </Label>
              <Input
                type="text"
                placeholder="Enter HOA due"
                name="hoaDue"
                value={formData.hoaDue}
                onChange={handleChange}
                className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">
                Homeowners Association fees.
              </p>
            </div>

            {/* Service Fee */}
            <div>
              <Label className="text-sm font-semibold text-gray-700">
                Service Fee
              </Label>
              <Input
                type="text"
                placeholder="Enter service fee"
                name="serviceFee"
                value={formData.serviceFee}
                onChange={handleChange}
                className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">
                Additional service fee if applicable.
              </p>
            </div>

            {/* Down Payment Options */}
            <div>
              <Label className="text-sm font-semibold text-gray-700">
                Down Payment Option 1
              </Label>
              <Input
                type="text"
                placeholder="Enter down payment 1"
                name="downPaymentOne"
                value={formData.downPaymentOne}
                onChange={handleChange}
                className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">
                Down Payment Option 2
              </Label>
              <Input
                type="text"
                placeholder="Enter down payment 2"
                name="downPaymentTwo"
                value={formData.downPaymentTwo}
                onChange={handleChange}
                className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">
                Down Payment Option 3
              </Label>
              <Input
                type="text"
                placeholder="Enter down payment 3"
                name="downPaymentThree"
                value={formData.downPaymentThree}
                onChange={handleChange}
                className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
              />
            </div>

            {/* Monthly Payment Options */}
            <div>
              <Label className="text-sm font-semibold text-gray-700">
                Monthly Payment Option 1
              </Label>
              <Input
                type="text"
                placeholder="Enter monthly payment 1"
                name="monthlyPaymentOne"
                value={formData.monthlyPaymentOne}
                onChange={handleChange}
                className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">
                Monthly Payment Option 2
              </Label>
              <Input
                type="text"
                placeholder="Enter monthly payment 2"
                name="monthlyPaymentTwo"
                value={formData.monthlyPaymentTwo}
                onChange={handleChange}
                className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">
                Monthly Payment Option 3
              </Label>
              <Input
                type="text"
                placeholder="Enter monthly payment 3"
                name="monthlyPaymentThree"
                value={formData.monthlyPaymentThree}
                onChange={handleChange}
                className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
              />
            </div>

            {/* Loan Terms (Months) */}
            <div>
              <Label className="text-sm font-semibold text-gray-700">
                Loan Terms (Months)
              </Label>
              <Input
                type="text"
                placeholder="Enter loan terms"
                name="term"
                value={formData.term}
                onChange={handleChange}
                className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
              />
            </div>

            {/* Interest Rate Options */}
            <div>
              <Label className="text-sm font-semibold text-gray-700">
                Interest Rate Option 1 (%)
              </Label>
              <Input
                type="text"
                placeholder="Enter interest rate option 1"
                name="interestOne"
                value={formData.interestOne}
                onChange={handleChange}
                className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">
                Interest Rate Option 2 (%)
              </Label>
              <Input
                type="text"
                placeholder="Enter interest rate option 2"
                name="interestTwo"
                value={formData.interestTwo}
                onChange={handleChange}
                className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">
                Interest Rate Option 3 (%)
              </Label>
              <Input
                type="text"
                placeholder="Enter interest rate option 3"
                name="interestThree"
                value={formData.interestThree}
                onChange={handleChange}
                className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
