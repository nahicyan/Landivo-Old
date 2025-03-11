"use client";

import React, { useState, useEffect } from "react";
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

export default function PaymentCalculatorBack({ formData, handleChange }) {
  // Local state for margin multipliers (for downPaymentOne adjustments)
  const [marginPercent, setMarginPercent] = useState(1);
  const [marginDollar, setMarginDollar] = useState(0);

  // Local state for financing percentage (reverse percent multiplier)
  const [financingPercentage, setFinancingPercentage] = useState("25");

  // New state: checkboxes to lock values
  const [lockDownPayment, setLockDownPayment] = useState(false);
  const [lockFinancing, setLockFinancing] = useState(false);

  // Convert purchasePrice from formData
  const purchasePrice = Number(formData.purchasePrice) || 0;

  //
  // Force interestOne to 9.99% (Plan One)
  //
  useEffect(() => {
    if (Number(formData.interestOne) !== 9.99) {
      handleChange({ target: { name: "interestOne", value: 9.99 } });
    }
  }, [formData.interestOne, handleChange]);

  //
  // 1) If marginPercent changes, recalc downPaymentOne (if not locked)
  //
  useEffect(() => {
    if (purchasePrice >= 0 && !lockDownPayment) {
      const newDP = purchasePrice * marginPercent;
      handleChange({ target: { name: "downPaymentOne", value: newDP } });
      setMarginDollar(marginPercent - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchasePrice, marginPercent, lockDownPayment]);

  //
  // 2) If marginDollar changes, recalc downPaymentOne (if not locked)
  //
  useEffect(() => {
    if (purchasePrice >= 0 && !lockDownPayment) {
      const newDP = purchasePrice * (1 + marginDollar);
      handleChange({ target: { name: "downPaymentOne", value: newDP } });
      setMarginPercent(1 + marginDollar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchasePrice, marginDollar, lockDownPayment]);

  //
  // 3) Financing Price: dp * (100 / financingPercentage) (if not locked)
  //
  useEffect(() => {
    const dp = Number(formData.downPaymentOne) || 0;
    const perc = Number(financingPercentage) || 0;
    if (!lockFinancing) {
      if (dp > 0 && perc > 0) {
        const newFinancedPrice = dp * (100 / perc);
        handleChange({ target: { name: "financedPrice", value: newFinancedPrice } });
      } else {
        handleChange({ target: { name: "financedPrice", value: 0 } });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.downPaymentOne, financingPercentage, lockFinancing]);

  //
  // 4) Loan Amount: financedPrice - downPaymentOne
  //
  useEffect(() => {
    const financed = Number(formData.financedPrice) || 0;
    const dp = Number(formData.downPaymentOne) || 0;
    if (financed >= 0 && dp >= 0) {
      const newLoanAmount = financed - dp;
      handleChange({ target: { name: "loanAmount", value: newLoanAmount } });
    } else {
      handleChange({ target: { name: "loanAmount", value: 0 } });
    }
  }, [formData.financedPrice, formData.downPaymentOne, handleChange]);

  //
  // 5) Monthly Payment (amortization formula)
  //    monthlyPaymentOne = loanAmount * (r / (1 - (1 + r)^(-term)))
  //    where r = interestOne/100/12, term = # of months
  //
  useEffect(() => {
    const loan = Number(formData.loanAmount) || 0;
    const months = Number(formData.term) || 0;
    const annualInterest = Number(formData.interestOne) || 0; // forced 9.99%
    if (loan > 0 && months > 0 && annualInterest > 0) {
      const monthlyRate = annualInterest / 100 / 12;
      const numerator = loan * monthlyRate;
      const denominator = 1 - Math.pow(1 + monthlyRate, -months);
      if (denominator !== 0) {
        const newMonthlyPayment = numerator / denominator;
        handleChange({ target: { name: "monthlyPaymentOne", value: newMonthlyPayment } });
      }
    } else {
      handleChange({ target: { name: "monthlyPaymentOne", value: 0 } });
    }
  }, [formData.loanAmount, formData.term, formData.interestOne, handleChange]);

  // margin % options: from 20% (0.2) to 200% (2.0) in 0.1 increments
  const marginPercentOptions = Array.from({ length: 19 }, (_, i) =>
    (0.2 + i * 0.1).toFixed(1)
  );
  // margin $ options: from -0.9 to +2.0 in 0.1 increments
  const marginDollarOptions = Array.from({ length: 30 }, (_, i) =>
    (-0.9 + i * 0.1).toFixed(1)
  );
  // financing %: 5% to 75% in 5% increments
  const financingOptions = Array.from({ length: 15 }, (_, i) =>
    (5 + i * 5).toString()
  );

  return (
    <Card className="border border-gray-200 shadow-sm rounded-lg w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Step 1: Calculate Loan Amount
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Row 1: Purchase Price & (Fixed) InterestOne */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Purchase Price */}
          <div>
            <Label htmlFor="purchasePrice" className="block text-sm font-semibold text-gray-700 mb-1">
              Purchase Price
            </Label>
            <Input
              id="purchasePrice"
              name="purchasePrice"
              type="text"
              placeholder="Enter purchase price"
              value={formData.purchasePrice}
              onChange={handleChange}
              className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
            />
          </div>

          {/* Fixed InterestOne */}
          <div>
            <Label className="block text-sm font-semibold text-gray-700 mb-1">
              Interest Rate (Plan One)
            </Label>
            <Input
              type="text"
              value="9.99%"
              readOnly
              className="w-full border-gray-300 bg-gray-100 text-gray-700 rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              Fixed at 9.99% APR for monthly payment calculation.
            </p>
          </div>
        </div>

        {/* Row 2: Down Payment, Margin % and Margin $ with Lock Checkbox */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Down Payment */}
          <div>
            <Label htmlFor="downPaymentOne" className="block text-sm font-semibold text-gray-700 mb-1">
              Down Payment
            </Label>
            <Input
              id="downPaymentOne"
              name="downPaymentOne"
              type="text"
              placeholder="Enter down payment"
              value={formData.downPaymentOne}
              onChange={handleChange}
              className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
            />
            <div className="flex items-center mt-1">
              <input
                type="checkbox"
                checked={lockDownPayment}
                onChange={(e) => setLockDownPayment(e.target.checked)}
                className="mr-2"
              />
              <span className="text-xs text-gray-500">Lock Down Payment</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Defaults to Purchase Price, but can be changed independently.
            </p>
          </div>

          {/* Margin % Dropdown */}
          <div>
            <Label className="block text-sm font-semibold text-gray-700 mb-1">
              Margin %
            </Label>
            <Select
              name="marginPercent"
              value={marginPercent.toFixed(1)}
              onValueChange={(val) => setMarginPercent(Number(val))}
            >
              <SelectTrigger className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]">
                <SelectValue placeholder="Select margin %" />
              </SelectTrigger>
              <SelectContent>
                {marginPercentOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {(Number(option) * 100).toFixed(0)}%
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">
              E.g., 1.2 means 20% above Purchase Price.
            </p>
          </div>

          {/* Margin $ Dropdown */}
          <div>
            <Label className="block text-sm font-semibold text-gray-700 mb-1">
              Margin $
            </Label>
            <Select
              name="marginDollar"
              value={marginDollar.toFixed(1)}
              onValueChange={(val) => setMarginDollar(Number(val))}
            >
              <SelectTrigger className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md">
                <SelectValue placeholder="Select margin $" />
              </SelectTrigger>
              <SelectContent>
                {marginDollarOptions.map((option) => {
                  const multiplier = Number(option);
                  const finalDP = purchasePrice * (1 + multiplier);
                  return (
                    <SelectItem key={option} value={option}>
                      ${finalDP.toLocaleString()}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">
              Adjust the down payment relative to Purchase Price.
            </p>
          </div>
        </div>

        {/* Row 3: Financing Price Calculation (Editable) with Lock Checkbox */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Financing Price (editable) */}
          <div>
            <Label htmlFor="financedPrice" className="block text-sm font-semibold text-gray-700 mb-1">
              Financing Price
            </Label>
            <Input
              id="financedPrice"
              name="financedPrice"
              type="text"
              placeholder="Financing Price"
              value={formData.financedPrice}
              onChange={handleChange}
              className="w-full border-gray-300 text-gray-700 rounded-md"
            />
            <div className="flex items-center mt-1">
              <input
                type="checkbox"
                checked={lockFinancing}
                onChange={(e) => setLockFinancing(e.target.checked)}
                className="mr-2"
              />
              <span className="text-xs text-gray-500">Lock Financing Price</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              You can type a value or select from the dropdown below.
            </p>
          </div>

          {/* Financing Percentage Dropdown */}
          <div>
            <Label className="block text-sm font-semibold text-gray-700 mb-1">
              Financing %
            </Label>
            <Select
              name="financingPercentage"
              value={financingPercentage}
              onValueChange={(value) => setFinancingPercentage(value)}
            >
              <SelectTrigger className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md">
                <SelectValue placeholder="Select financing %" />
              </SelectTrigger>
              <SelectContent>
                {financingOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}%
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">
              E.g., 5% means financedPrice = Down Payment × 20.
            </p>
          </div>
        </div>

        {/* Row 4: Loan Amount & Term & Monthly Payment */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Loan Amount (read-only) */}
          <div>
            <Label className="block text-sm font-semibold text-gray-700 mb-1">
              Loan Amount
            </Label>
            <Input
              type="text"
              placeholder="Loan amount"
              value={
                formData.loanAmount
                  ? Number(formData.loanAmount).toLocaleString()
                  : ""
              }
              readOnly
              className="w-full border-gray-300 bg-gray-100 text-gray-700 rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              (Financing Price - Down Payment)
            </p>
          </div>

          {/* Term (months) */}
          <div>
            <Label className="block text-sm font-semibold text-gray-700 mb-1">
              Term (months)
            </Label>
            <Input
              type="text"
              name="term"
              placeholder="Enter term in months"
              value={formData.term || ""}
              onChange={handleChange}
              className="w-full border-gray-300 focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              E.g., 180 for 15 years
            </p>
          </div>

          {/* Monthly Payment (read-only) */}
          <div>
            <Label className="block text-sm font-semibold text-gray-700 mb-1">
              Monthly Payment
            </Label>
            <Input
              type="text"
              placeholder="Monthly Payment"
              value={
                formData.monthlyPaymentOne
                  ? Number(formData.monthlyPaymentOne).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })
                  : ""
              }
              readOnly
              className="w-full border-gray-300 bg-gray-100 text-gray-700 rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              Based on Loan Amount (Plan One @ 9.99%), Term
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}