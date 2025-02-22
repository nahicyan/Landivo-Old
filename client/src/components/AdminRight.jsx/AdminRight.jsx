import React from "react";
import PropertyTable from "../PropertyTable/PropertyTable";

export default function PropertyDetailsRight({ propertyData }) {
    return (
      <div className="bg-transparent">
        <PropertyTable propertyData={propertyData} />
      </div>
    );
  }
  