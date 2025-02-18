import React from "react";
import {
  LocationOn,
  Home,
  AttachMoney,
  Layers,
  LocalOffer,
  WaterDrop,
  Map as MapIcon,
  Description,
} from "@mui/icons-material";
import DetailCard from "../DetailCard/DetailCard";
import Map from "../Map/Map";

const PropertyDetailsSection = ({
  propertyData,
  expanded,
  setExpanded,
  MAX_LINES = 4,
}) => {
  return (
    <div className="mt-4">
      {/* === Description Section === */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-md hover:shadow-xl transition-all duration-300">
        {/* Section Title */}
        <div className="flex items-center gap-2 mb-4">
          <Description className="w-6 h-6 text-black" />
          <h2 className="text-2xl font-bold text-black">Description</h2>
        </div>

        {/* Description Content */}
        <div className="text-gray-700 text-base leading-7">
          <div
            dangerouslySetInnerHTML={{ __html: propertyData.description }}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: expanded ? "unset" : MAX_LINES,
              WebkitBoxOrient: "vertical",
              overflow: expanded ? "visible" : "hidden",
            }}
          />
        </div>

        {/* Show More / Show Less Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 bg-black text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      </div>

      {/* === Property Details Section === */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-md hover:shadow-xl transition-all duration-300">
        {/* Section Title */}
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-6 h-6 text-black" />
          <h2 className="text-2xl font-bold text-black">Property Details</h2>
        </div>

        {/* 2-Column Grid for Detail Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Location */}
          <DetailCard
            title="Location"
            items={[
              `Address: ${propertyData.streetaddress}, ${propertyData.city}, ${propertyData.state} ${propertyData.zip}`,
              `County: ${propertyData.county}`,
              `Area: ${propertyData.area}`,
              `Coordinates: ${propertyData.latitude}, ${propertyData.longitude}`,
            ]}
            icon={<LocationOn className="w-5 h-5 text-black" />}
          />

          {/* Utilities & Infrastructure */}
          <DetailCard
            title="Utilities & Infrastructure"
            items={[
              `Water: ${propertyData.water}`,
              `Sewer: ${propertyData.sewer}`,
              `Electricity: ${propertyData.electric}`,
              `Road Condition: ${propertyData.roadCondition}`,
              `Floodplain: ${propertyData.floodplain}`,
            ]}
            icon={<WaterDrop className="w-5 h-5 text-black" />}
          />

          {/* Financial Information */}
          <DetailCard
            title="Financial Information"
            items={[
              `Asking Price: $${propertyData.askingPrice.toLocaleString()}`,
              `Minimum Price: $${propertyData.minPrice.toLocaleString()}`,
              `Discount Price: $${propertyData.disPrice.toLocaleString()}`,
              `Financing: ${propertyData.financing}`,
            ]}
            icon={<AttachMoney className="w-5 h-5 text-black" />}
          />

          {/* HOA & Zoning */}
          <DetailCard
            title="HOA & Zoning"
            items={[
              `Zoning: ${propertyData.zoning}`,
              `Restrictions: ${propertyData.restrictions}`,
              `HOA/POA: ${propertyData.hoaPoa}`,
              `HOA Info: ${propertyData.hoaDeedDevInfo}`,
            ]}
            icon={<Home className="w-5 h-5 text-black" />}
          />

          {/* Physical Attributes */}
          <DetailCard
            title="Physical Attributes"
            items={[
              `Square Feet: ${propertyData.sqft.toLocaleString()}`,
              `Acreage: ${propertyData.acre}`,
              `Mobile Home Friendly: ${
                propertyData.mobileHomeFriendly === "true" ? "Yes" : "No"
              }`,
            ]}
            icon={<Layers className="w-5 h-5 text-black" />}
          />

          {/* Additional Information */}
          <DetailCard
            title="Additional Information"
            items={[
              <div
                key="notes"
                dangerouslySetInnerHTML={{ __html: propertyData.notes }}
                style={{ whiteSpace: "pre-wrap" }}
              />,
            ]}
            icon={<LocalOffer className="w-5 h-5 text-black" />}
          />
        </div>
      </div>

      {/* === Map Section === */}
      {propertyData.landId === "Available" ? (
  <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-md hover:shadow-xl transition-all duration-300">
    <div className="flex items-center gap-2 mb-4">
      <MapIcon className="w-6 h-6 text-black" />
      <h2 className="text-2xl font-bold text-black">Map</h2>
    </div>
    <div className="relative w-full h-0 pb-[40%]">
      <iframe
        loading="lazy"
        frameBorder="0"
        src={propertyData.landIdLink.replace("/share/", "/embed/")}
        className="absolute top-0 left-0 w-full h-full border-0"
      />
    </div>
  </div>
) : (
  <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-md hover:shadow-xl transition-all duration-300">
    <div className="flex items-center gap-2 mb-4">
      <MapIcon className="w-6 h-6 text-black" />
      <h2 className="text-2xl font-bold text-black">Map</h2>
    </div>
    <div className="relative w-full h-0 pb-[42%]">
      <div className="absolute top-0 left-0 w-full h-full">
        <Map
          address={propertyData.streetaddress}
          city={propertyData.city}
          state={propertyData.state}
        />
      </div>
    </div>
  </div>
)}



      {/* === Disclaimer Section === */}
      <div className="bg-gray-200 border border-transparent rounded-xl p-6 shadow-md mt-4">
        {/* "Chip" Equivalent */}
        <span className="inline-block bg-black text-white px-3 py-1 rounded-md mb-2 text-sm font-semibold">
          Disclaimer
        </span>
        <p className="text-justify text-xs leading-tight text-gray-700">
          Dear Visitor, This is a broker price opinion or comparative market
          analysis and should not be considered an appraisal or opinion of
          value. In making any decision that relies upon our work, you should
          know that we have not followed the guidelines for the development of
          an appraisal or analysis contained in the Uniform Standards of
          Professional Appraisal Practice of the Appraisal Foundation. Always
          perform your due diligence to verify any numbers presented before
          signing a contract to purchase. Landers Investment LLC has an
          equitable interest in this property and does not claim to be the
          owner. Managing Members of Landers Investment LLC holds active real
          estate licenses in the state of Texas. We do NOT represent you as your
          real estate agent in any capacity whatsoever unless agreed upon by all
          parties in writing. Selling through an assignment of contract. LANDERS
          INVESTMENT is selling an option or assigning an interest in a contract
          and does not represent, warrant, or claim to be the owner of or
          currently possess legal title to this, or any of the properties we
          market for sale. All properties are subject to errors, omissions,
          deletions, additions, and cancellations. All properties are sold as
          is, where is, with absolutely no representations written or oral.
          Buyer is to do their own independent due diligence. The property will
          not be considered under contract until the signed contract and earnest
          money are received with all contingencies removed. - Thank you. Landers
          Investment LLC Team
        </p>
      </div>
    </div>
  );
};

export default PropertyDetailsSection;
