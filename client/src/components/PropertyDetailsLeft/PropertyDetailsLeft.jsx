import React from "react";
import PropertyHighlights from "../PropertyHighlights/PropertyHighlights";
import PropertyDetailsDescription from "../PropertyDetailsDescription/PropertyDetailsDescription";
import PropertyDetailsDetails from "../PropertyDetailsDetails/PropertyDetailsDetails"; // <-- Import here
import PropertyDisclaimer from "../PropertyDisclaimer/PropertyDisclaimer";

export default function PropertyDetailsLeft({ propertyData }) {
  return (
    <div className="p-4 rounded shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Property Highlights
      </h2>

      {/* Quick Facts Card Group */}
      <PropertyHighlights propertyData={propertyData} />

      {/* Rich-text property description */}
      <div className="mt-6 w-full md:w-4/5 md:ml-0"> 
        <PropertyDetailsDescription propertyData={propertyData} />
      </div>

      {/* Additional property details (two-column tables + accordion) */}
      <div className="mt-6">
        <PropertyDetailsDetails propertyData={propertyData} />
      </div>
            {/* Property Details */}
            <div className="mt-6 bg-[#FFF]">
          <PropertyDisclaimer propertyData={propertyData} />
        </div>

    </div>
  );
}
