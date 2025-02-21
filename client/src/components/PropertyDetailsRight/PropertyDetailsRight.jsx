import React from "react";
import Offer from "../Offer/Offer";

export default function PropertyDetailsRight({ propertyData }) {
  return (
    // This container can scroll, but the heading & offer remain pinned at top
    <div className="h-full overflow-auto">
      <div className="sticky top-0 bg-transparent">
        <Offer propertyData={propertyData} />
      </div>
    </div>
  );
}
