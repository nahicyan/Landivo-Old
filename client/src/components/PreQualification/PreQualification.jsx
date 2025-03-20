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
        if (!price && price !== 0) return "";
        // Convert to string, remove commas and any non-numeric characters except decimal point
        const cleanedPrice = String(price).replace(/,/g, "").replace(/[^0-9.]/g, "");
        return cleanedPrice;
      };
      
      // Use the financing price from propertyData, with askingPrice as fallback
      const financedPrice = propertyData.financedPrice || propertyData.askingPrice;
      
      // Pass the appropriate price as propertyPrice parameter
      const cleanedPropertyPrice = cleanPrice(financedPrice);
      params.append("propertyPrice", cleanedPropertyPrice);
      
      console.log("Sending propertyPrice:", cleanedPropertyPrice);
      
      // Selected plan data (using plan 1 as default)
      if (propertyData.loanAmountOne) {
        const cleanedLoanAmount = cleanPrice(propertyData.loanAmountOne);
        params.append("loanAmount", cleanedLoanAmount);
        console.log("Sending loanAmount:", cleanedLoanAmount);
      }
      
      if (propertyData.interestOne) {
        const cleanedInterestRate = cleanPrice(propertyData.interestOne);
        params.append("interestRate", cleanedInterestRate);
        console.log("Sending interestRate:", cleanedInterestRate);
      }
      
      if (propertyData.monthlyPaymentOne) {
        const cleanedMonthlyPayment = cleanPrice(propertyData.monthlyPaymentOne);
        params.append("monthlyPayment", cleanedMonthlyPayment);
        console.log("Sending monthlyPayment:", cleanedMonthlyPayment);
      }
      
      if (propertyData.downPaymentOne) {
        const cleanedDownPayment = cleanPrice(propertyData.downPaymentOne);
        params.append("downPayment", cleanedDownPayment);
        console.log("Sending downPayment:", cleanedDownPayment);
      }
      
      if (propertyData.term) {
        params.append("term", propertyData.term);
        console.log("Sending term:", propertyData.term);
      }
      
      // Property address information
      if (propertyData.streetAddress) {
        params.append("propertyAddress", propertyData.streetAddress);
        console.log("Sending propertyAddress:", propertyData.streetAddress);
      }
      
      if (propertyData.city) {
        params.append("propertyCity", propertyData.city);
        console.log("Sending propertyCity:", propertyData.city);
      }
      
      if (propertyData.state) {
        params.append("propertyState", propertyData.state);
        console.log("Sending propertyState:", propertyData.state);
      }
      
      if (propertyData.zip) {
        params.append("propertyZip", propertyData.zip);
        console.log("Sending propertyZip:", propertyData.zip);
      }
    }
    
    // Log parameters for debugging
    console.log("Qualification parameters:", Object.fromEntries(params.entries()));
    
    // Redirect to qualification survey with parameters
    const qualificationUrl = `https://qualify.landivo.com?${params.toString()}`;
    console.log("Redirecting to:", qualificationUrl);
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