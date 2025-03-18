"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

// Utility: Format numbers as currency
const formatCurrency = (value) => {
  if (!value || isNaN(value)) return "";
  return Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export default function PaymentCalculatorBack({ initialData = {} }) {
  // ---------------------
  // State
  // ---------------------
  const [formData, setFormData] = useState({
    // Row 1
    financingPrice: "",
    purchasePrice: "",
    askingPrice: "150000", // example value
    // Row 2
    tax: "",
    hoaDue: "",
    serviceFee: "",
    term: "",
    // Plan 1
    downPaymentOne: "",
    downPaymentOnePercent: "5",     // default to 5%
    loanAmountOne: "",
    interestRateOne: "4.99",         // default to 4.99%
    monthlyPaymentOne: "",
    downPaymentOneSlider: 1,         // slider from 1-99 (%)
    downPaymentOneSource: "selector", // "selector", "slider", or "manual"
    // Plan 2
    downPaymentTwo: "",
    downPaymentTwoPercent: "5",
    loanAmountTwo: "",
    interestRateTwo: "4.99",
    monthlyPaymentTwo: "",
    downPaymentTwoSlider: 1,
    downPaymentTwoSource: "selector",
    // Plan 3
    downPaymentThree: "",
    downPaymentThreePercent: "5",
    loanAmountThree: "",
    interestRateThree: "4.99",
    monthlyPaymentThree: "",
    downPaymentThreeSlider: 1,
    downPaymentThreeSource: "selector",
    ...initialData,
  });

  // ---------------------
  // Handlers
  // ---------------------
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // For ShadCN Select (for selector and interest rate)
  function handleSelectChange(name, value) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // For Sliders: value comes as an array, e.g., [50]
  function handleSliderChange(name, value) {
    setFormData((prev) => ({ ...prev, [name]: value[0] }));
  }

  // ---------------------
  // Recalculate Derived Values for Each Plan
  // ---------------------
  // Helper: Calculate monthly payment using a basic amortization formula
  const calculateMonthlyPayment = (loan, rate, term) => {
    const principal = Number(loan) || 0;
    const annualRate = Number(rate) / 100 || 0;
    const months = Number(term) || 0;
    if (principal <= 0 || annualRate <= 0 || months <= 0) return 0;
    const monthlyRate = annualRate / 12;
    const numerator = monthlyRate * principal;
    const denominator = 1 - Math.pow(1 + monthlyRate, -months);
    return denominator > 0 ? numerator / denominator : 0;
  };

  // Recalculation logic per plan ("One", "Two", "Three")
  function recalcPlan(planKey) {
    const { financingPrice, term, tax, hoaDue, serviceFee } = formData;
    const financeVal = Number(financingPrice) || 0;

    const downPaymentField = `downPayment${planKey}`;
    const downPaymentPercentField = `downPayment${planKey}Percent`;
    const loanAmountField = `loanAmount${planKey}`;
    const interestRateField = `interestRate${planKey}`;
    const monthlyPaymentField = `monthlyPayment${planKey}`;
    const sliderField = `downPayment${planKey}Slider`;
    const sourceField = `downPayment${planKey}Source`;

    const dpManual = Number(formData[downPaymentField]);
    const dpPercentVal = Number(formData[downPaymentPercentField]) || 5;
    const sliderVal = Number(formData[sliderField]) || 1;
    const interestRateVal = Number(formData[interestRateField]) || 0;

    // Determine new down payment based on the last update source
    let newDownPayment = 0;
    const source = formData[sourceField];
    if (source === "manual") {
      newDownPayment = dpManual || 0;
    } else if (source === "selector") {
      newDownPayment = financeVal * (dpPercentVal / 100);
    } else if (source === "slider") {
      newDownPayment = financeVal * (sliderVal / 100);
    }

    // Calculate Loan Amount = financingPrice - downPayment
    const newLoanAmount = financeVal - newDownPayment;
    // Calculate Monthly Payment using the amortization formula
    const newMonthlyPayment = calculateMonthlyPayment(newLoanAmount, interestRateVal, Number(term));

    // Update state for the plan
    setFormData((prev) => ({
      ...prev,
      [downPaymentField]: newDownPayment.toFixed(2),
      [loanAmountField]: newLoanAmount.toFixed(2),
      [monthlyPaymentField]: newMonthlyPayment.toFixed(2),
    }));
  }

  // Recalculate each plan when relevant fields change:
  useEffect(() => {
    recalcPlan("One");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formData.financingPrice,
    formData.downPaymentOne,
    formData.downPaymentOnePercent,
    formData.downPaymentOneSlider,
    formData.interestRateOne,
    formData.term,
    formData.tax,
    formData.hoaDue,
    formData.serviceFee,
    formData.downPaymentOneSource,
  ]);

  useEffect(() => {
    recalcPlan("Two");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formData.financingPrice,
    formData.downPaymentTwo,
    formData.downPaymentTwoPercent,
    formData.downPaymentTwoSlider,
    formData.interestRateTwo,
    formData.term,
    formData.tax,
    formData.hoaDue,
    formData.serviceFee,
    formData.downPaymentTwoSource,
  ]);

  useEffect(() => {
    recalcPlan("Three");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formData.financingPrice,
    formData.downPaymentThree,
    formData.downPaymentThreePercent,
    formData.downPaymentThreeSlider,
    formData.interestRateThree,
    formData.term,
    formData.tax,
    formData.hoaDue,
    formData.serviceFee,
    formData.downPaymentThreeSource,
  ]);

  // ---------------------
  // Render
  // ---------------------
  return (
    <Card className="border border-gray-200 shadow-sm rounded-lg w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Landivo Payment Calculator v0.0.0.1C
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* ------------------- Row 1 ------------------- */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Financing Price */}
          <div>
            <Label htmlFor="financingPrice" className="block text-sm font-semibold text-gray-700 mb-1">
              Financing Price
            </Label>
            <Input
              id="financingPrice"
              name="financingPrice"
              type="number"
              placeholder="Enter financing price"
              value={formData.financingPrice}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          {/* Purchase Price */}
          <div>
            <Label htmlFor="purchasePrice" className="block text-sm font-semibold text-gray-700 mb-1">
              Purchase Price
            </Label>
            <Input
              id="purchasePrice"
              name="purchasePrice"
              type="number"
              placeholder="Enter purchase price"
              value={formData.purchasePrice}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          {/* Asking Price (display-only) */}
          <div>
            <Label className="block text-sm font-semibold text-gray-700 mb-1">
              Asking Price
            </Label>
            <Input
              type="text"
              readOnly
              value={formData.askingPrice}
              className="w-full bg-gray-100 text-gray-600"
            />
          </div>
        </div>

        {/* ------------------- Row 2 ------------------- */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Tax */}
          <div>
            <Label htmlFor="tax" className="block text-sm font-semibold text-gray-700 mb-1">
              Tax
            </Label>
            <Input
              id="tax"
              name="tax"
              type="number"
              placeholder="Yearly tax"
              value={formData.tax}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          {/* HOA Due */}
          <div>
            <Label htmlFor="hoaDue" className="block text-sm font-semibold text-gray-700 mb-1">
              HOA Due
            </Label>
            <Input
              id="hoaDue"
              name="hoaDue"
              type="number"
              placeholder="Yearly HOA"
              value={formData.hoaDue}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          {/* Service Fee */}
          <div>
            <Label htmlFor="serviceFee" className="block text-sm font-semibold text-gray-700 mb-1">
              Service Fee
            </Label>
            <Input
              id="serviceFee"
              name="serviceFee"
              type="number"
              placeholder="Service fee"
              value={formData.serviceFee}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          {/* Term (months) */}
          <div>
            <Label htmlFor="term" className="block text-sm font-semibold text-gray-700 mb-1">
              Term (months)
            </Label>
            <Input
              id="term"
              name="term"
              type="number"
              placeholder="e.g., 180"
              value={formData.term}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </div>

        {/* ============================================================
            PLAN 1
        ============================================================ */}
        {/* ------------------- Row 3 ------------------- */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Down Payment (Plan 1) */}
          <div>
            <Label htmlFor="downPaymentOne" className="block text-sm font-semibold text-gray-700 mb-1">
              Down Payment (Plan 1)
            </Label>
            <Input
              id="downPaymentOne"
              name="downPaymentOne"
              type="number"
              placeholder="Enter down payment"
              value={formData.downPaymentOne}
              onChange={(e) => {
                handleChange(e);
                setFormData((prev) => ({ ...prev, downPaymentOneSource: "manual" }));
              }}
              className="w-full"
            />
          </div>
          {/* Down Payment Selector (Plan 1) */}
          <div>
            <Label className="block text-sm font-semibold text-gray-700 mb-1">
              Down Payment % (Plan 1)
            </Label>
            <Select
              value={formData.downPaymentOnePercent}
              onValueChange={(val) => {
                handleSelectChange("downPaymentOnePercent", val);
                setFormData((prev) => ({ ...prev, downPaymentOneSource: "selector" }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select %" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(19)].map((_, i) => {
                  const percent = 5 + i * 5; // 5, 10, ... 95
                  return (
                    <SelectItem key={percent} value={String(percent)}>
                      {percent}% (
                      {formatCurrency((Number(formData.financingPrice) || 0) * (percent / 100))}
                      )
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          {/* Loan Amount (Plan 1) */}
          <div>
            <Label className="block text-sm font-semibold text-gray-700 mb-1">
              Loan Amount (Plan 1)
            </Label>
            <Input
              type="text"
              readOnly
              value={formatCurrency(formData.loanAmountOne)}
              className="w-full bg-gray-100"
            />
          </div>
          {/* Interest Rate (Plan 1) */}
          <div>
            <Label className="block text-sm font-semibold text-gray-700 mb-1">
              Interest Rate (Plan 1)
            </Label>
            <Select
              value={formData.interestRateOne}
              onValueChange={(val) => handleSelectChange("interestRateOne", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Rate" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(11)].map((_, i) => {
                  const rate = (4.99 + i).toFixed(2);
                  return (
                    <SelectItem key={rate} value={rate}>
                      {rate}%
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ------------------- Row 4 (Plan 1 Slider & Monthly Payment) ------------------- */}
        <div className="grid grid-cols-4 gap-4">
          {/* Slider takes 3/4 of the width */}
          <div className="col-span-3">
            <Label className="block text-sm font-semibold text-gray-700 mb-2">
              Down Payment vs. Loan Amount (Plan 1)
            </Label>
            <Slider
              value={[formData.downPaymentOneSlider]}
              min={1}
              max={99}
              step={1}
              onValueChange={(val) => {
                handleSliderChange("downPaymentOneSlider", val);
                setFormData((prev) => ({ ...prev, downPaymentOneSource: "slider" }));
              }}
            />
            <p className="text-xs text-gray-500 mt-2">
              Currently: {formData.downPaymentOneSlider}%
            </p>
          </div>
          {/* Monthly Payment occupies 1/4 */}
          <div className="col-span-1">
            <Label className="block text-sm font-semibold text-gray-700 mb-1">
              Monthly Payment (Plan 1)
            </Label>
            <Input
              type="text"
              readOnly
              value={formatCurrency(formData.monthlyPaymentOne)}
              className="w-full bg-gray-100"
            />
          </div>
        </div>

        {/* ============================================================
            PLAN 2
        ============================================================ */}
        {/* ------------------- Row 5 ------------------- */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Down Payment (Plan 2) */}
          <div>
            <Label htmlFor="downPaymentTwo" className="block text-sm font-semibold text-gray-700 mb-1">
              Down Payment (Plan 2)
            </Label>
            <Input
              id="downPaymentTwo"
              name="downPaymentTwo"
              type="number"
              placeholder="Enter down payment"
              value={formData.downPaymentTwo}
              onChange={(e) => {
                handleChange(e);
                setFormData((prev) => ({ ...prev, downPaymentTwoSource: "manual" }));
              }}
              className="w-full"
            />
          </div>
          {/* Down Payment Selector (Plan 2) */}
          <div>
            <Label className="block text-sm font-semibold text-gray-700 mb-1">
              Down Payment % (Plan 2)
            </Label>
            <Select
              value={formData.downPaymentTwoPercent}
              onValueChange={(val) => {
                handleSelectChange("downPaymentTwoPercent", val);
                setFormData((prev) => ({ ...prev, downPaymentTwoSource: "selector" }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select %" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(19)].map((_, i) => {
                  const percent = 5 + i * 5;
                  return (
                    <SelectItem key={percent} value={String(percent)}>
                      {percent}% (
                      {formatCurrency((Number(formData.financingPrice) || 0) * (percent / 100))}
                      )
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          {/* Loan Amount (Plan 2) */}
          <div>
            <Label className="block text-sm font-semibold text-gray-700 mb-1">
              Loan Amount (Plan 2)
            </Label>
            <Input
              type="text"
              readOnly
              value={formatCurrency(formData.loanAmountTwo)}
              className="w-full bg-gray-100"
            />
          </div>
          {/* Interest Rate (Plan 2) */}
          <div>
            <Label className="block text-sm font-semibold text-gray-700 mb-1">
              Interest Rate (Plan 2)
            </Label>
            <Select
              value={formData.interestRateTwo}
              onValueChange={(val) => handleSelectChange("interestRateTwo", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Rate" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(11)].map((_, i) => {
                  const rate = (4.99 + i).toFixed(2);
                  return (
                    <SelectItem key={rate} value={rate}>
                      {rate}%
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ------------------- Row 6 (Plan 2 Slider & Monthly Payment) ------------------- */}
        <div className="grid grid-cols-4 gap-4">
          {/* Slider (3/4 width) */}
          <div className="col-span-3">
            <Label className="block text-sm font-semibold text-gray-700 mb-2">
              Down Payment vs. Loan Amount (Plan 2)
            </Label>
            <Slider
              value={[formData.downPaymentTwoSlider]}
              min={1}
              max={99}
              step={1}
              onValueChange={(val) => {
                handleSliderChange("downPaymentTwoSlider", val);
                setFormData((prev) => ({ ...prev, downPaymentTwoSource: "slider" }));
              }}
            />
            <p className="text-xs text-gray-500 mt-2">
              Currently: {formData.downPaymentTwoSlider}%
            </p>
          </div>
          {/* Monthly Payment (1/4 width) */}
          <div className="col-span-1">
            <Label className="block text-sm font-semibold text-gray-700 mb-1">
              Monthly Payment (Plan 2)
            </Label>
            <Input
              type="text"
              readOnly
              value={formatCurrency(formData.monthlyPaymentTwo)}
              className="w-full bg-gray-100"
            />
          </div>
        </div>

        {/* ============================================================
            PLAN 3
        ============================================================ */}
        {/* ------------------- Row 7 ------------------- */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Down Payment (Plan 3) */}
          <div>
            <Label htmlFor="downPaymentThree" className="block text-sm font-semibold text-gray-700 mb-1">
              Down Payment (Plan 3)
            </Label>
            <Input
              id="downPaymentThree"
              name="downPaymentThree"
              type="number"
              placeholder="Enter down payment"
              value={formData.downPaymentThree}
              onChange={(e) => {
                handleChange(e);
                setFormData((prev) => ({ ...prev, downPaymentThreeSource: "manual" }));
              }}
              className="w-full"
            />
          </div>
          {/* Down Payment Selector (Plan 3) */}
          <div>
            <Label className="block text-sm font-semibold text-gray-700 mb-1">
              Down Payment % (Plan 3)
            </Label>
            <Select
              value={formData.downPaymentThreePercent}
              onValueChange={(val) => {
                handleSelectChange("downPaymentThreePercent", val);
                setFormData((prev) => ({ ...prev, downPaymentThreeSource: "selector" }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select %" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(19)].map((_, i) => {
                  const percent = 5 + i * 5;
                  return (
                    <SelectItem key={percent} value={String(percent)}>
                      {percent}% (
                      {formatCurrency((Number(formData.financingPrice) || 0) * (percent / 100))}
                      )
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          {/* Loan Amount (Plan 3) */}
          <div>
            <Label className="block text-sm font-semibold text-gray-700 mb-1">
              Loan Amount (Plan 3)
            </Label>
            <Input
              type="text"
              readOnly
              value={formatCurrency(formData.loanAmountThree)}
              className="w-full bg-gray-100"
            />
          </div>
          {/* Interest Rate (Plan 3) */}
          <div>
            <Label className="block text-sm font-semibold text-gray-700 mb-1">
              Interest Rate (Plan 3)
            </Label>
            <Select
              value={formData.interestRateThree}
              onValueChange={(val) => handleSelectChange("interestRateThree", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Rate" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(11)].map((_, i) => {
                  const rate = (4.99 + i).toFixed(2);
                  return (
                    <SelectItem key={rate} value={rate}>
                      {rate}%
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ------------------- Row 8 (Plan 3 Slider & Monthly Payment) ------------------- */}
        <div className="grid grid-cols-4 gap-4">
          {/* Slider (3/4 width) */}
          <div className="col-span-3">
            <Label className="block text-sm font-semibold text-gray-700 mb-2">
              Down Payment vs. Loan Amount (Plan 3)
            </Label>
            <Slider
              value={[formData.downPaymentThreeSlider]}
              min={1}
              max={99}
              step={1}
              onValueChange={(val) => {
                handleSliderChange("downPaymentThreeSlider", val);
                setFormData((prev) => ({ ...prev, downPaymentThreeSource: "slider" }));
              }}
            />
            <p className="text-xs text-gray-500 mt-2">
              Currently: {formData.downPaymentThreeSlider}%
            </p>
          </div>
          {/* Monthly Payment (1/4 width) */}
          <div className="col-span-1">
            <Label className="block text-sm font-semibold text-gray-700 mb-1">
              Monthly Payment (Plan 3)
            </Label>
            <Input
              type="text"
              readOnly
              value={formatCurrency(formData.monthlyPaymentThree)}
              className="w-full bg-gray-100"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
