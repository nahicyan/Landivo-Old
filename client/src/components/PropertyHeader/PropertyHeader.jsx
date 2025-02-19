import React from "react";
import PropertyHeaderLeft from "../PropertyHeaderLeft/PropertyHeaderLeft";
import PropertyHeaderRight from "../PropertyHeaderRight/PropertyHeaderRight";

export default function PropertyHeader({ propertyData }) {
  return (
    <header className="w-full bg-[#FDF8F2]">
      <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-2">
        
        {/* Left Section: 3/4 of container on large screens */}
        <div className="w-full lg:w-3/4">
          <PropertyHeaderLeft propertyData={propertyData} />
        </div>

        {/* Right Section: 1/4 of container on large screens */}
        <div className="w-full lg:w-1/4">
          <PropertyHeaderRight propertyData={propertyData} />
        </div>

      </div>
    </header>
  );
}
