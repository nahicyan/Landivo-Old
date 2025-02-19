import React, { useContext, useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { getProperty } from "../../utils/api";
import { UserContext } from "../../utils/UserContext";
import PropertyHeader from "../../components/PropertyHeader/PropertyHeader";

const Property = () => {
  const { pathname } = useLocation();
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const [propertyData, setPropertyData] = useState(null);
  const { currentUser } = useContext(UserContext);

  // Extract property ID from the URL
  const propertyId = pathname.split("/").slice(-1)[0];

  // Fetch property data using React Query
  const { data, isLoading, isError } = useQuery(
    ["resd", propertyId],
    () => getProperty(propertyId),
    { retry: 1, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (data) {
      setPropertyData(data);
    }
  }, [data]);

  // **Fix: Scroll the left section when scrolling on the right**
  useEffect(() => {
    const handleScrollRight = (event) => {
      if (leftSectionRef.current) {
        event.preventDefault(); // Stop the default scroll on right section
        leftSectionRef.current.scrollTop += event.deltaY; // Scroll left section
      }
    };

    const rightSection = rightSectionRef.current;
    if (rightSection) {
      rightSection.addEventListener("wheel", handleScrollRight, { passive: false });
    }

    return () => {
      if (rightSection) {
        rightSection.removeEventListener("wheel", handleScrollRight);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          Error while fetching the property details. Please try again.
        </Typography>
      </Box>
    );
  }

  if (!propertyData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">No property data available.</Typography>
      </Box>
    );
  }

  return (
    <div className="bg-[#FDF8F2] min-h-screen p-4 text-[#4b5b4d]">
      {/* Property Header */}
      <PropertyHeader propertyData={propertyData} />
    </div>

  );
};

export default Property;
