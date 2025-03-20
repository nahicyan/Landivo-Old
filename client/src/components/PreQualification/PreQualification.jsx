"use client";

import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PreQualification({ propertyData }) {
  // Function to redirect to qualification survey with property data
  const handlePrequalify = () => {
    // Format property data for URL parameters
    const params = new URLSearchParams();
    
    // Add essential property data
    if (propertyData) {
      // Property identifier
      params.append("propertyId", propertyData.id);
      
      // Financial information - ensure to strip formatting and commas
      // We use a simple helper to clean up price values
      const cleanPrice = (price) => {
        if (!price) return "";
        // Convert to string, remove commas and any non-numeric characters except decimal point
        return String(price).replace(/,/g, "").replace(/[^0-9.]/g, "");
      };
      
      params.append("propertyPrice", cleanPrice(propertyData.askingPrice));
      
      // Selected plan data (using plan 1 as default)
      if (propertyData.loanAmountOne) params.append("loanAmount", cleanPrice(propertyData.loanAmountOne));
      if (propertyData.interestOne) params.append("interestRate", cleanPrice(propertyData.interestOne));
      if (propertyData.monthlyPaymentOne) params.append("monthlyPayment", cleanPrice(propertyData.monthlyPaymentOne));
      if (propertyData.downPaymentOne) params.append("downPayment", cleanPrice(propertyData.downPaymentOne));
      if (propertyData.term) params.append("term", propertyData.term);
      
      // Property address information
      if (propertyData.streetAddress) params.append("propertyAddress", propertyData.streetAddress);
      if (propertyData.city) params.append("propertyCity", propertyData.city);
      if (propertyData.state) params.append("propertyState", propertyData.state);
      if (propertyData.zip) params.append("propertyZip", propertyData.zip);
    }
    
    // Log parameters for debugging
    console.log("Qualification parameters:", Object.fromEntries(params.entries()));
    
    // Redirect to qualification survey with parameters
    const qualificationUrl = `https://qualify.landivo.com?${params.toString()}`;
    window.open(qualificationUrl, "_blank");
  };

  return (
    <div className="flex items-center justify-between bg-[#ccf5cc] p-4 rounded-lg">
      {/* Left Column: Bullet Points */}
      <div className="flex flex-col gap-2 text-sm text-[#01783e]">
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Takes About 2 Minutes</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Won't affect your credit score</span>
        </div>
      </div>

      {/* Right Column: Button */}
      <Button
        onClick={handlePrequalify}
        className="
          bg-[#324c48] 
          text-white 
          px-4 
          py-2 
          text-sm 
          font-semibold 
          rounded-md 
          hover:bg-[#3f4f24]
          transition-colors
        "
      >
        Get Pre-Qualified
      </Button>
    </div>
  );
}