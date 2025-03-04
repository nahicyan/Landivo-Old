"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

// Use your backend URL from your environment
const API_URL = `${import.meta.env.VITE_SERVER_URL}/api`;

export default function AddressAutocomplete({ handleChange }) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!inputValue) {
      setOptions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(`${API_URL}/autocomplete`, {
          params: { input: inputValue },
          withCredentials: true, // if needed for session auth
        });
        if (response.data.predictions) {
          setOptions(response.data.predictions);
        }
      } catch (error) {
        console.error("Error fetching address suggestions:", error);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const handleSelect = async (event, newValue) => {
    if (newValue) {
      try {
        const response = await axios.get(`${API_URL}/place-details`, {
          params: { place_id: newValue.place_id },
          withCredentials: true,
        });

        const details = response.data.result;
        const addressComponents = details.address_components;

        const getComponent = (type) =>
          addressComponents.find((comp) => comp.types.includes(type))?.long_name || "";

        handleChange({
          target: { name: "streetAddress", value: details.formatted_address || "" },
        });
        handleChange({ target: { name: "city", value: getComponent("locality") } });
        handleChange({ target: { name: "county", value: getComponent("administrative_area_level_2") } });
        handleChange({ target: { name: "state", value: getComponent("administrative_area_level_1") } });
        handleChange({ target: { name: "zip", value: getComponent("postal_code") } });
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      onChange={handleSelect}
      renderInput={(params) => (
        <TextField {...params} label="Street Address" variant="outlined" />
      )}
    />
  );
}
