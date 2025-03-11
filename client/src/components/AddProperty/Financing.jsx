"use client";

import React, { useState } from "react";
import PaymentCalculatorBack from "@/components/PaymentCalculator/PaymentCalculatorBack";
import PaymentCalculatorEntry from "@/components/PaymentCalculator/PaymentCalculatorEntry";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function Financing() {
  // Main parent state for all financing fields
  const [formData, setFormData] = useState({
    // Step 1 fields:
    purchasePrice: "5000",
    financedPrice: "",
    downPaymentOne: "",
    
    // Payment Calculator multipliers:
    interestOne: "9.99", // fixed 9.99% for plan one
    interestTwo: "10.99",
    interestThree: "11.99",
    
    monthlyPaymentOne: "0",
    monthlyPaymentTwo: "",
    monthlyPaymentThree: "",
    
    downPaymentTwo: "",
    downPaymentThree: "",
    
    // Additional financing fields
    tax: "",
    hoaDue: "",
    serviceFee: "",
    financing: "Not-Available", // default to "Not-Available"

    // Loan & monthly payment calculations
    loanAmount: "0", 
    term: "60", // default 60 months for demonstration
  });

  // Update parent formData
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // States for controlling the modal
  const [openModal, setOpenModal] = useState(false);
  const [planType, setPlanType] = useState(null); 
  // planType can be "CALC" (PaymentCalculatorBack) or "ENTRY" (PaymentCalculatorEntry)

  // Temporary state to store changes made in the modal (so we can Cancel or Apply)
  const [tempData, setTempData] = useState({ ...formData });

  // Handler to open the modal with either PaymentCalculatorBack or PaymentCalculatorEntry
  const openModalWithPlan = (type) => {
    setPlanType(type);
    // Make a fresh copy of the current formData for editing in the modal
    setTempData({ ...formData });
    setOpenModal(true);
  };

  // Handler to close modal without applying changes
  const handleCancel = () => {
    setOpenModal(false);
    // We do NOT merge tempData back into formData
  };

  // Handler to apply changes from tempData into formData
  const handleApply = () => {
    setFormData({ ...tempData });
    setOpenModal(false);
  };

  // A specialized change handler for the modal that updates tempData
  const handleTempChange = (e) => {
    setTempData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="p-4 bg-[#FDF8F2]" style={{ color: "#030001" }}>
      {/* 1) Select if Payment Plans are Available */}
      <div className="mb-4 w-64">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Payment Plans
        </label>
        <Select
          name="financing"
          value={formData.financing}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, financing: value }))
          }
        >
          <SelectTrigger className="w-full border border-gray-300 rounded-md">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Not-Available">Not Available</SelectItem>
            <SelectItem value="Available">Available</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 mt-1">
          Are Payment Plans available?
        </p>
      </div>

      {/* 2) If Payment Plans = "Available", show 2 buttons */}
      {formData.financing === "Available" && (
        <div className="flex items-center gap-4">
          {/* Button 1: Use Payment Calculator (PaymentCalculatorBack) */}
          <Button
            type="button"
            className="bg-[#3f4f24] hover:bg-[#324c48] text-white px-4 py-2 rounded-md"
            onClick={() => openModalWithPlan("CALC")}
          >
            Use Payment Calculator
          </Button>

          {/* Button 2: Payment Plan Entry (PaymentCalculatorEntry) */}
          <Button
            type="button"
            className="bg-[#3f4f24] hover:bg-[#324c48] text-white px-4 py-2 rounded-md"
            onClick={() => openModalWithPlan("ENTRY")}
          >
            Payment Plan Entry
          </Button>
        </div>
      )}

      {/* 3) Modal (Dialog) for either PaymentCalculatorBack or PaymentCalculatorEntry */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-4xl mx-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">
              {planType === "CALC"
                ? "Payment Calculator (Plan One)"
                : "Payment Plan Entry"}
            </DialogTitle>
          </DialogHeader>

          {/* Render either PaymentCalculatorBack or PaymentCalculatorEntry */}
          {planType === "CALC" ? (
            <PaymentCalculatorBack
              formData={tempData}
              handleChange={handleTempChange}
            />
          ) : planType === "ENTRY" ? (
            <PaymentCalculatorEntry
              formData={tempData}
              handleChange={handleTempChange}
            />
          ) : null}

          <DialogFooter>
            <Button
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              className="bg-[#3f4f24] hover:bg-[#324c48] text-white"
            >
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
