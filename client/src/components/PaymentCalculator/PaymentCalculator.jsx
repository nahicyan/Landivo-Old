"use client";

import React, { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PieChart, Pie, Label as RechartsLabel, Tooltip } from "recharts";

export default function PaymentCalculator({ propertyData }) {
  const [selectedOption, setSelectedOption] = useState("1");

  // Pick data based on selected option
  const { interest, monthlyPayment, downPayment } = useMemo(() => {
    switch (selectedOption) {
      case "2":
        return {
          interest: propertyData.interestTwo,
          monthlyPayment: propertyData.monthlyPaymentTwo,
          downPayment: propertyData.downPaymentTwo,
        };
      case "3":
        return {
          interest: propertyData.interestThree,
          monthlyPayment: propertyData.monthlyPaymentThree,
          downPayment: propertyData.downPaymentThree,
        };
      default:
        // "1"
        return {
          interest: propertyData.interestOne,
          monthlyPayment: propertyData.monthlyPaymentOne,
          downPayment: propertyData.downPaymentOne,
        };
    }
  }, [selectedOption, propertyData]);

  // Break down monthlyPayment into slices
  const loanPortion = Math.max(
    0,
    (monthlyPayment || 0) - (propertyData.hoaDue || 0) - (propertyData.serviceFee || 0)
  );
  const hoaPortion = propertyData.hoaDue || 0;
  const feePortion = propertyData.serviceFee || 0;

  // Donut slices with theme colors
  const chartData = [
    { name: "Loan", value: loanPortion, fill: "#324c48" }, // secondary
    { name: "HOA", value: hoaPortion, fill: "#01783e" }, // you may update if needed
    { name: "Service Fee", value: feePortion, fill: "#d03c0b" }, // remains as is, or update if desired
  ];
  const totalMonthly = loanPortion + hoaPortion + feePortion;

  return (
    <Card className="border border-gray-200 shadow-sm rounded-lg w-full max-w-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold" style={{ color: "#030001" }}>
          Payment Calculator
        </CardTitle>
        <CardDescription className="text-sm" style={{ color: "#576756" }}>
          <span>Compare payment options for this property</span>
          <div>
            <Label className="text-sm font-semibold" style={{ color: "#030001" }}>
              Choose a financing option
            </Label>
            <RadioGroup
              className="flex items-center gap-4 mt-2"
              value={selectedOption}
              onValueChange={setSelectedOption}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  id="option1"
                  value="1"
                  className="w-4 h-4 rounded-full border border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-transparent"
                />
                <Label htmlFor="option1" className="cursor-pointer" style={{ color: "#030001" }}>
                  Option 1
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  id="option2"
                  value="2"
                  className="w-4 h-4 rounded-full border border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-transparent"
                />
                <Label htmlFor="option2" className="cursor-pointer" style={{ color: "#030001" }}>
                  Option 2
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  id="option3"
                  value="3"
                  className="w-4 h-4 rounded-full border border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-transparent"
                />
                <Label htmlFor="option3" className="cursor-pointer" style={{ color: "#030001" }}>
                  Option 3
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Left Column: Donut Chart */}
          <div className="sm:w-1/2 flex items-center justify-center">
            <div className="w-[300px] h-[300px]">
              <PieChart width={300} height={300}>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  strokeWidth={3}
                >
                  <RechartsLabel
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="text-xl font-bold"
                              style={{ fill: "#030001" }}
                            >
                              ${totalMonthly.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 20}
                              className="text-sm"
                              style={{ fill: "#576756" }}
                            >
                              /mo
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>

          {/* Right Column: Payment Summary */}
          <div className="sm:w-1/2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Loan Term */}
              <div>
                <Label className="block text-sm font-semibold mb-1" style={{ color: "#030001" }}>
                  Loan Term
                </Label>
                <div className="text-base" style={{ color: "#030001" }}>
                  {propertyData.term || 0} Months
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <Label className="block text-sm font-semibold mb-1" style={{ color: "#030001" }}>
                  Interest Rate
                </Label>
                <div className="text-base" style={{ color: "#030001" }}>
                  {interest || 0}% APR
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <Label className="block text-sm font-semibold mb-1" style={{ color: "#030001" }}>
                  Down Payment
                </Label>
                <div className="text-base" style={{ color: "#030001" }}>
                  ${downPayment?.toLocaleString() || 0}
                </div>
              </div>

              {/* Estimated Payment */}
              <div>
                <Label className="block text-sm font-semibold mb-1" style={{ color: "#030001" }}>
                  Estimated Payment
                </Label>
                <div className="text-xl font-bold" style={{ color: "#324c48" }}>
                  ${monthlyPayment?.toLocaleString() || 0}/mo
                </div>
              </div>

              {/* Property Tax */}
              <div>
                <Label className="block text-sm font-semibold mb-1" style={{ color: "#030001" }}>
                  Property Tax
                </Label>
                <div className="text-base" style={{ color: "#030001" }}>
                  ${propertyData.tax?.toLocaleString() || 0}
                </div>
              </div>

              {/* Financed Price */}
              <div>
                <Label className="block text-sm font-semibold mb-1" style={{ color: "#030001" }}>
                  Financed Price
                </Label>
                <div className="text-base" style={{ color: "#030001" }}>
                  ${propertyData.financedPrice?.toLocaleString() || 0}
                </div>
              </div>

              {/* HOA Dues */}
              <div>
                <Label className="block text-sm font-semibold mb-1" style={{ color: "#030001" }}>
                  HOA Dues
                </Label>
                <div className="text-base" style={{ color: "#030001" }}>
                  ${propertyData.hoaDue?.toLocaleString() || 0}
                </div>
              </div>

              {/* Service Fee */}
              <div>
                <Label className="block text-sm font-semibold mb-1" style={{ color: "#030001" }}>
                  Service Fee
                </Label>
                <div className="text-base" style={{ color: "#030001" }}>
                  ${propertyData.serviceFee?.toLocaleString() || 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <div className="text-xs" style={{ color: "#576756" }}>
        You may pay off the property at any time with no pre-payment penalty. Closing Costs: Buyer pays all closing costs
        </div>
      </CardFooter>
    </Card>
  );
}
