"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Lock, LockOpen } from "lucide-react";

// Helper component for currency inputs with "$" prefix and comma formatting
const CurrencyInput = ({ value, onChange, readOnly = false, placeholder }) => {
  let displayValue = value;
  if (value !== undefined && value !== "" && !isNaN(Number(value))) {
    displayValue = Number(value).toLocaleString();
  }
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
      <Input
        type="text"
        placeholder={placeholder}
        value={displayValue}
        onChange={onChange}
        readOnly={readOnly}
        className="pl-8 w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
      />
    </div>
  );
};

export default function SectionOne() {
  // Row 1 state
  const [purchasePrice, setPurchasePrice] = useState("");
  const [financedPrice, setFinancedPrice] = useState("");
  const [interestRate, setInterestRate] = useState("9.99");
  // Row 2 state
  const [downPayment, setDownPayment] = useState("");
  const [loanAmount, setLoanAmount] = useState("");

  // Lock state: only one of these fields can be locked at a time.
  // Allowed values: "downPayment", "financedPrice", "loanAmount", or "" if none are locked.
  const [lockedField, setLockedField] = useState("");

  // Interest rate options (dropdown) from 5.99% to 15.99%
  const interestOptions = [];
  for (let i = 5.99; i <= 15.99; i += 1) {
    interestOptions.push(i.toFixed(2));
  }

  // Handlers for Row 1:
  const handleApplyPurchasePrice = () => {
    // When applying Purchase Price, update Down Payment if it's not locked.
    if (lockedField !== "downPayment") {
      setDownPayment(purchasePrice);
    }
  };

  const handleApplyFinancedPrice = () => {
    // When applying Financing Price:
    // If Financing Price is locked, update Loan Amount = Financed Price - Down Payment.
    // If Down Payment is locked, update Financing Price = Loan Amount + Down Payment.
    // Otherwise, default update Loan Amount.
    if (lockedField === "financedPrice") {
      const computedLoan = Number(financedPrice) - Number(downPayment);
      setLoanAmount(computedLoan.toString());
    } else if (lockedField === "downPayment") {
      const computedFinanced = Number(loanAmount) + Number(downPayment);
      setFinancedPrice(computedFinanced.toString());
    } else {
      const computedLoan = Number(financedPrice) - Number(downPayment);
      setLoanAmount(computedLoan.toString());
    }
  };

  // Handlers for Row 2:
  const handleApplyDownPayment = () => {
    if (lockedField === "downPayment") {
      const computedLoan = Number(financedPrice) - Number(downPayment);
      setLoanAmount(computedLoan.toString());
    } else if (lockedField === "loanAmount") {
      const computedDP = Number(financedPrice) - Number(loanAmount);
      setDownPayment(computedDP.toString());
    } else {
      setDownPayment(purchasePrice);
    }
  };

  const handleApplyLoanAmount = () => {
    if (lockedField === "loanAmount") {
      const computedDP = Number(financedPrice) - Number(loanAmount);
      setDownPayment(computedDP.toString());
    } else if (lockedField === "downPayment") {
      const computedLoan = Number(financedPrice) - Number(downPayment);
      setLoanAmount(computedLoan.toString());
    } else {
      const computedLoan = Number(financedPrice) - Number(downPayment);
      setLoanAmount(computedLoan.toString());
    }
  };

  // Toggle lock state for a field.
  const toggleLock = (field) => {
    if (lockedField === field) {
      setLockedField("");
    } else {
      setLockedField(field);
    }
  };

  return (
    <div className="space-y-8 p-4 border border-gray-200 rounded-lg shadow-sm">
      {/* Row 1 */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Purchase Price Input */}
        <div className="flex-1">
          <Label className="text-sm font-semibold text-gray-700">Purchase Price</Label>
          <Input
            type="text"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            placeholder="Enter purchase price"
          />
        </div>
        {/* Apply Button for Purchase Price */}
        <div>
          <Button onClick={handleApplyPurchasePrice} type="button">
            Apply
          </Button>
        </div>
        {/* Financing Price Input */}
        <div className="flex-1">
          <Label className="text-sm font-semibold text-gray-700">Financing Price</Label>
          <CurrencyInput
            value={financedPrice}
            onChange={(e) => setFinancedPrice(e.target.value)}
            placeholder="Enter financing price"
            readOnly={lockedField === "financedPrice"}
          />
        </div>
        {/* Lock Button for Financing Price */}
        <div>
          <Button
            onClick={() => toggleLock("financedPrice")}
            type="button"
            variant={lockedField === "financedPrice" ? "secondary" : "outline"}
          >
            {lockedField === "financedPrice" ? <Lock /> : <LockOpen />}
          </Button>
        </div>
        {/* Apply Button for Financing Price */}
        <div>
          <Button onClick={handleApplyFinancedPrice} type="button">
            Apply
          </Button>
        </div>
        {/* Interest Rate Dropdown */}
        <div className="flex-1">
          <Label className="text-sm font-semibold text-gray-700">Interest Rate</Label>
          <Select
            value={interestRate}
            onValueChange={(val) => setInterestRate(val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select interest rate" />
            </SelectTrigger>
            <SelectContent>
              {interestOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}%
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Row 2 */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Down Payment Input */}
        <div className="flex-1">
          <Label className="text-sm font-semibold text-gray-700">Down Payment</Label>
          <CurrencyInput
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            placeholder="Down Payment"
            readOnly={lockedField === "downPayment"}
          />
        </div>
        {/* Lock Button for Down Payment */}
        <div>
          <Button
            onClick={() => toggleLock("downPayment")}
            type="button"
            variant={lockedField === "downPayment" ? "secondary" : "outline"}
          >
            {lockedField === "downPayment" ? <Lock /> : <LockOpen />}
          </Button>
        </div>
        {/* Apply Button for Down Payment */}
        <div>
          <Button onClick={handleApplyDownPayment} type="button">
            Apply
          </Button>
        </div>
        {/* Loan Amount Input */}
        <div className="flex-1">
          <Label className="text-sm font-semibold text-gray-700">Loan Amount</Label>
          <CurrencyInput
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Loan Amount"
            readOnly={lockedField === "loanAmount"}
          />
        </div>
        {/* Lock Button for Loan Amount */}
        <div>
          <Button
            onClick={() => toggleLock("loanAmount")}
            type="button"
            variant={lockedField === "loanAmount" ? "secondary" : "outline"}
          >
            {lockedField === "loanAmount" ? <Lock /> : <LockOpen />}
          </Button>
        </div>
        {/* Apply Button for Loan Amount */}
        <div>
          <Button onClick={handleApplyLoanAmount} type="button">
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
