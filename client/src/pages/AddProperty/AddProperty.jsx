"use client";

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createResidencyWithFiles } from "@/utils/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserContext } from "../../utils/UserContext";

// Import your subcomponents
import SystemInfo from "@/components/AddProperty/SystemInfo";
import ListingDetails from "@/components/AddProperty/ListingDetails";
import Classification from "@/components/AddProperty/Classification";
import Location from "@/components/AddProperty/Location";
import Dimension from "@/components/AddProperty/Dimension";
import Pricing from "@/components/AddProperty/Pricing";
import Financing from "@/components/AddProperty/Financing";
import Utilities from "@/components/AddProperty/Utilities";
import MediaTags from "@/components/AddProperty/MediaTags";

// OPTIONAL: A small icon for completed steps (from Lucide)
import { Check } from "lucide-react";

export default function AddProperty() {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  // Current step index
  const [step, setStep] = useState(0);

  // Dialog state for alert after submission
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success"); // "success" or "warning"

  // Form data state
  const [formData, setFormData] = useState({
    // System Information
    userEmail: "",
    ownerId: "",
    status: "",
    area: "",

    // Listing Details

    title: "",
    description: "",
    notes: "",

    // Classification
    type: "",
    legalDescription: "",
    zoning: "",
    restrictions: "",
    mobileHomeFriendly: "",
    hoaPoa: "",
    hoaPaymentTerms: "",
    hoaFee: "",
    survey: "",

    // Address and Location
    direction: "",
    streetAddress: "",
    city: "",
    county: "",
    state: "",
    zip: "",
    latitude: "",
    longitude: "",
    apnOrPin: "",
    landId: "",
    landIdLink: "",

    // Dimensions
    sqft: "",
    acre: "",

    // Pricing and Financing
    askingPrice: "",
    minPrice: "",
    disPrice: "",

    // Financing and Payment Calculation
    financing: "",
    tax: "",
    hoaDue: "",
    serviceFee: "",
    term: "",
    interestOne: "",
    interestTwo: "",
    interestThree: "",
    monthlyPaymentOne: "",
    monthlyPaymentTwo: "",
    monthlyPaymentThree: "",
    downPaymentOne: "",
    downPaymentTwo: "",
    downPaymentThree: "",
    purchasePrice: "",
    financedPrice: "",

    // Utilities and Infrastructure
    water: "",
    sewer: "",
    electric: "",
    roadCondition: "",
    floodplain: "",

    //Media & Tags
    ltag: "",
    rtag: "",
    imageUrls: "",
  });

  // If you need to store images in the parent:
  const [uploadedImages, setUploadedImages] = useState([]);

  // Auto-set user email
  useEffect(() => {
    if (currentUser?.email) {
      setFormData((prev) => ({ ...prev, userEmail: currentUser.email }));
    }
  }, [currentUser]);

  // Numeric fields formatting, etc.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev };
      const numericFields = [
        // Physical Attributes
        "sqft",
        "acre",

        // Pricing and Financing
        "askingPrice",
        "minPrice",
        "disPrice",
        "hoaFee",

        // Financing and Payment Calculation
        "tax",
        "hoaDue",
        "serviceFee",
        //"term",
        "interestOne",
        "interestTwo",
        "interestThree",
        "monthlyPaymentOne",
        "monthlyPaymentTwo",
        "monthlyPaymentThree",
        "downPaymentOne",
        "downPaymentTwo",
        "downPaymentThree",
        "purchasePrice",
        "financedPrice",
      ];

      if (numericFields.includes(name)) {
        const noCommas = value.replace(/,/g, "");
        const numberVal = parseFloat(noCommas);
        if (!isNaN(numberVal)) {
          updated[name] = numberVal.toLocaleString("en-US");
          if (name === "sqft") {
            updated.acre = (numberVal / 43560).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          }
        } else {
          updated[name] = "";
          if (name === "sqft") updated.acre = "";
        }
      } else {
        updated[name] = value;
      }
      return updated;
    });
  };

  // Multi-step form steps (pass props to components that need them)
  const steps = [
    {
      title: "System Info",
      // Pass formData and handleChange so that SystemInfo can render the user email display
      component: <SystemInfo formData={formData} handleChange={handleChange} />,
    },
    {
      title: "Listing Details",
      component: (
        <ListingDetails
          formData={formData}
          handleTitleChange={(val) =>
            setFormData((prev) => ({ ...prev, title: val }))
          }
          handleDescriptionChange={(val) =>
            setFormData((prev) => ({ ...prev, description: val }))
          }
          handleNotesChange={(val) =>
            setFormData((prev) => ({ ...prev, notes: val }))
          }
        />
      ),
    },
    {
      title: "Classification",
      component: (
        <Classification formData={formData} handleChange={handleChange} />
      ),
    },
    {
      title: "Location",
      component: (
        <Location
          formData={formData}
          handleChange={handleChange}
          setFormData={setFormData}
        />
      ),
    },
    { title: "Dimensions", component: <Dimension /> },
    {
      title: "Pricing",
      component: <Pricing formData={formData} handleChange={handleChange} />,
    },
    {
      title: "Financing",
      component: (
        <Financing
          formData={formData}
          handleChange={handleChange}
          updateFormData={(updatedData) => setFormData(updatedData)}
        />
      ),
    },
    {
      title: "Utilities",
      component: <Utilities formData={formData} handleChange={handleChange} />,
    },
    {
      title: "Media & Tags",
      component: (
        <MediaTags
          formData={formData}
          handleChange={handleChange}
          uploadedImages={uploadedImages}
          setUploadedImages={setUploadedImages}
        />
      ),
    },
  ];

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const numericFields = [
        // Physical Attributes
        "sqft",
        "acre",

        // Pricing and Financing
        "askingPrice",
        "minPrice",
        "disPrice",
        "hoaFee",

        // Financing and Payment Calculation
        "tax",
        "hoaDue",
        "serviceFee",
        //"term",
        "interestOne",
        "interestTwo",
        "interestThree",
        "monthlyPaymentOne",
        "monthlyPaymentTwo",
        "monthlyPaymentThree",
        "downPaymentOne",
        "downPaymentTwo",
        "downPaymentThree",
        "purchasePrice",
        "financedPrice",
      ];

      const multipartForm = new FormData();
      for (let key in formData) {
        if (key === "imageUrls") continue; // skip imageUrls here
        let val = formData[key];
        if (numericFields.includes(key) && typeof val === "string") {
          val = val.replace(/,/g, "");
        }
        multipartForm.append(key, val);
      }

      // If existing images
      let existingImages = [];
      if (formData.imageUrls && formData.imageUrls.trim() !== "") {
        try {
          existingImages = JSON.parse(formData.imageUrls);
          if (!Array.isArray(existingImages)) existingImages = [];
        } catch (err) {
          existingImages = [];
        }
      }
      multipartForm.append("imageUrls", JSON.stringify(existingImages));

      // Append newly uploaded files
      uploadedImages.forEach((file) => multipartForm.append("images", file));

      await createResidencyWithFiles(multipartForm);

      setDialogMessage("Property added successfully!");
      setDialogType("success");
      setDialogOpen(true);
    } catch (error) {
      console.error("Error creating property:", error);
      // Attempt to extract a detailed error message from the response
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Unknown error";
      setDialogMessage(`Failed to create property: ${errorMsg}`);
      setDialogType("warning");
      setDialogOpen(true);
    }
  };

  // Steps navigation
  const nextStep = () =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  // Step Indicator (breadcrumb)
  const StepIndicator = ({ currentStep }) => {
    return (
      <div className="flex items-center justify-center space-x-4 mb-6">
        {steps.map((item, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          return (
            <div key={index} className="flex items-center space-x-2">
              <div
                className={
                  "w-8 h-8 flex items-center justify-center rounded-full border-2 " +
                  (isCompleted
                    ? "border-green-500 bg-green-500 text-white"
                    : isActive
                    ? "border-blue-500 bg-blue-100 text-blue-700"
                    : "border-gray-300 bg-white text-gray-500")
                }
              >
                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span
                className={
                  isCompleted || isActive
                    ? "font-bold text-gray-900"
                    : "text-gray-500"
                }
              >
                {item.title}
              </span>
              {index < steps.length - 1 && (
                <div className="w-8 h-[2px] bg-gray-300" />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Step Indicator */}
      <StepIndicator currentStep={step} />

      {/* SLIDER CONTAINER */}
      <div className="relative overflow-hidden w-full flex justify-center">
        <div
          className="flex transition-transform duration-300"
          style={{
            width: `${steps.length * 100}%`,
            transform: `translateX(-${step * 100}%)`,
          }}
        >
          {steps.map((item, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 flex justify-center"
              style={{ width: "100%" }}
            >
              <div className="max-w-lg w-full bg-white p-6 border border-gray-200 rounded-xl shadow-lg">
                {React.cloneElement(item.component, { formData, handleChange })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        {step > 0 && (
          <Button
            type="button"
            onClick={prevStep}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
          >
            Previous
          </Button>
        )}
        {step < steps.length - 1 && (
          <Button
            type="button"
            onClick={nextStep}
            className="bg-[#324c48] text-white px-4 py-2 rounded-md"
          >
            Next
          </Button>
        )}
        {step === steps.length - 1 && (
          <Button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Submit
          </Button>
        )}
      </div>

      {/* ShadCN Alert Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-white text-gray-900 border border-gray-300 shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle
              className={
                dialogType === "success" ? "text-green-600" : "text-red-600"
              }
            >
              {dialogType === "success" ? "Success" : "Warning"}
            </DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setDialogOpen(false);
                if (dialogType === "success") {
                  navigate("/properties");
                }
              }}
              className="bg-[#324c48] text-white"
            >
              Okay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
