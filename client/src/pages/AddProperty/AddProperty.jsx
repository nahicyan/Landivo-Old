import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Button, Stack} from "@mui/material";
import { useContext } from "react"; // New import
import { UserContext } from "../../utils/UserContext"; // New import for UserContext
import ImageUploadPreview from "../../components/ImageUploadPreview/ImageUploadPreview"; // Import the ImageUploadPreview componen
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";


const serverURL = import.meta.env.VITE_SERVER_URL;

const AddProperty = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    ownerid: "",
    userEmail: "",
    area: "",
    title: "",
    description: "",
    direction: "",
    type: "",
    subtype: "",
    zoning: "",
    restrictions: "",
    mobileHomeFriendly: "false",
    hoaPoa: "",
    hoaDeedDevInfo: "",
    notes: "",
    apnOrPin: "",
    streetaddress: "",
    city: "",
    county: "",
    state: "",
    zip: "",
    latitude: "",
    longitude: "",
    landId: "",
    landIdLink: "",
    sqft: "",
    acre: "",
    image: "",
    askingPrice: "",
    minPrice: "",
    disPrice: "",
    financing: "false",
    status: "Available",
    water: "",
    sewer: "",
    electric: "",
    roadCondition: "",
    floodplain: "",
    ltag: "",
    rtag: "",
  });


  useEffect(() => {
    if (currentUser?.email) {
      setFormData((prev) => ({
        ...prev,
        userEmail: currentUser.email,
      }));
    }
  }, [currentUser]);

 
  const [uploadedImages, setUploadedImages] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleQuillChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const multipartForm = new FormData();
      for (let key in formData) {
        multipartForm.append(key, formData[key]);
      }
      uploadedImages.forEach((image) => multipartForm.append("images", image.file));

      const response = await axios.post(
        `${serverURL}/api/residency/createWithFile`,
        multipartForm,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Property Added Successfully!");
      navigate("/properties");
    } catch (error) {
      console.error("Error creating property:", error);
      alert("Failed to create property");
    }
  };

  const textFieldStyle = {
    borderRadius: "12px",
    background: "#fff",
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
    },
    "& .MuiInputLabel-root": {
      fontWeight: 500,
    },
  };
  

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        p: 4,
        background: "#fff",
        borderRadius: "30px", // Fully rounded
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(200, 200, 200, 0.6)",
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ color: "#2d2d2d", fontWeight: 700 }}>
        Add New Property
      </Typography>
    
      {/* Display the User Email */}
          <Box
            sx={{
              background: "#f0f0f0",
              padding: 2,
              borderRadius: "12px",
              border: "1px solid rgba(200, 200, 200, 0.6)",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600, color: "#333" }}>
              You are uploading as:{" "}
              {currentUser ? (
              <Typography component="span" sx={{ fontWeight: 700, color: "#000" }}>
              {currentUser.email}
               </Typography>
                ) : (
                <Typography component="span" sx={{ color: "red" }}>Not logged in</Typography>
    )}
    
            </Typography>
          </Box>

    
      {/* System Information Section */}
      <Box sx={{ borderRadius: "20px", p: 3, background: "#fafafa" }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          System Information
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField fullWidth label="Owner ID" name="ownerid" value={formData.ownerid} onChange={handleChange} required sx={textFieldStyle} />
          <input type="hidden" name="userEmail" value={formData.userEmail} />
          <TextField fullWidth label="Area" name="area" value={formData.area} onChange={handleChange} required sx={textFieldStyle} />
        </Stack>
      </Box>
    
      {/* Property Details Section */}
      <Box sx={{ borderRadius: "20px", p: 3, background: "#fafafa" }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Property Details
        </Typography>
        <Stack spacing={2}>
          <TextField fullWidth label="Title" name="title" value={formData.title} onChange={handleChange} required sx={textFieldStyle} />
          {/* <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} sx={textFieldStyle} /> */}
          <TextField fullWidth label="Direction" name="direction" value={formData.direction} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="Type" name="type" value={formData.type} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="Sub Type" name="subtype" value={formData.subtype} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="Zoning" name="zoning" value={formData.zoning} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="Restrictions" name="restrictions" value={formData.restrictions} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="Mobile Home Friendly" name="mobileHomeFriendly" value={formData.mobileHomeFriendly} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="HOA / POA" name="hoaPoa" value={formData.hoaPoa} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="HOA / Deed / Development Info" name="hoaDeedDevInfo" value={formData.hoaDeedDevInfo} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="Notes" name="notes" value={formData.notes} onChange={handleChange} sx={textFieldStyle} />
        </Stack>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Description
        </Typography>
        <RichTextEditor
          value={formData.description}
          onChange={handleQuillChange}
          placeholder="Enter property description with emojis..."
        />
      </Box>

    
      {/* Location Section */}
      <Box sx={{ borderRadius: "20px", p: 3, background: "#fafafa" }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Location
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField fullWidth label="APN or PIN" name="apnOrPin" value={formData.apnOrPin} onChange={handleChange} required sx={textFieldStyle} />
          <TextField fullWidth label="Street Address" name="streetaddress" value={formData.streetaddress} onChange={handleChange} required sx={textFieldStyle} />
          <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} required sx={textFieldStyle} />
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField fullWidth label="County" name="county" value={formData.county} onChange={handleChange} required sx={textFieldStyle} />
          <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleChange} required sx={textFieldStyle} />
          <TextField fullWidth label="ZIP" name="zip" value={formData.zip} onChange={handleChange} required sx={textFieldStyle} />
        </Stack>
      </Box>
    
      {/* Map Section */}
      <Box sx={{ borderRadius: "20px", p: 3, background: "#fafafa" }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Map
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField fullWidth label="Latitude" name="latitude" value={formData.latitude} onChange={handleChange} required sx={textFieldStyle} />
          <TextField fullWidth label="Longitude" name="longitude" value={formData.longitude} onChange={handleChange} required sx={textFieldStyle} />
          <TextField fullWidth label="Land ID" name="landId" value={formData.landId} onChange={handleChange} sx={textFieldStyle} />
        </Stack>
        <TextField fullWidth label="Land ID Link" name="landIdLink" value={formData.landIdLink} onChange={handleChange} sx={textFieldStyle} />
      </Box>
    
      {/* Physical Attributes Section */}
      <Box sx={{ borderRadius: "20px", p: 3, background: "#fafafa" }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Physical Attributes
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField fullWidth label="Square Footage (sqft)" name="sqft" value={formData.sqft} onChange={handleChange} required sx={textFieldStyle} />
          <TextField fullWidth label="Acre" name="acre" value={formData.acre} onChange={handleChange} sx={textFieldStyle} />
        </Stack>
      </Box>
    
      {/* Image Upload Section */}
      <Box sx={{ borderRadius: "20px", p: 3, background: "#fafafa" }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Image Upload
        </Typography>
        <ImageUploadPreview uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />
      </Box>
    
      {/* Pricing and Financing Section */}
      <Box sx={{ borderRadius: "20px", p: 3, background: "#fafafa" }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Pricing and Financing
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField fullWidth label="Asking Price" name="askingPrice" value={formData.askingPrice} onChange={handleChange} required sx={textFieldStyle} />
          <TextField fullWidth label="Minimum Price" name="minPrice" value={formData.minPrice} onChange={handleChange} required sx={textFieldStyle} />
          <TextField fullWidth label="Discount Price" name="disPrice" value={formData.disPrice} onChange={handleChange} sx={textFieldStyle} />
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField fullWidth label="Financing Available" name="financing" value={formData.financing} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="Status" name="status" value={formData.status} onChange={handleChange} sx={textFieldStyle} />
        </Stack>
      </Box>
    
      {/* Utilities and Infrastructure Section */}
      <Box sx={{ borderRadius: "20px", p: 3, background: "#fafafa" }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Utilities and Infrastructure
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField fullWidth label="Water" name="water" value={formData.water} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="Sewer" name="sewer" value={formData.sewer} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="Electric" name="electric" value={formData.electric} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="Road Condition" name="roadCondition" value={formData.roadCondition} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="FloodPlain" name="floodplain" value={formData.floodplain} onChange={handleChange} sx={textFieldStyle} />
        </Stack>
      </Box>
    
      {/* Tags Section */}
      <Box sx={{ borderRadius: "20px", p: 3, background: "#fafafa" }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Tags
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField fullWidth label="Left Tag" name="ltag" value={formData.ltag} onChange={handleChange} sx={textFieldStyle} />
          <TextField fullWidth label="Right Tag" name="rtag" value={formData.rtag} onChange={handleChange} sx={textFieldStyle} />
        </Stack>
      </Box>
    
      {/* Submit Button */}
      <Box textAlign="center" mt={4}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            px: 5,
            py: 1.8,
            fontSize: "18px",
            borderRadius: "50px",
            background: "linear-gradient(135deg, #6ac259, #4caf50)",
            color: "#fff",
            "&:hover": {
              background: "linear-gradient(135deg, #4caf50, #388e3c)",
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
    
      );
    };
    
const InputField = ({ label, name, value, onChange, required = false, type = "text", multiple = false, options = [] }) => {
  if (type === "file") {
    return (
      <div className="input-group">
        <label>
          {label}
          {required && <span className="required">*</span>}
        </label>
        <input type="file" name={name} onChange={onChange} multiple={multiple} />
      </div>
    );
  }

  return (
    <div className="input-group">
      <label>
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input type={type} name={name} value={value} onChange={onChange} required={required} />
    </div>
  );
};



export default AddProperty;
