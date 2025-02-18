import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

/**
 * ImageSliderWithThumbnails
 *
 * A reusable slider component for displaying a list of images with
 * a main display area and circular thumbnails beneath.
 *
 * @param {Object[]} images - The array of image objects
 *    Each object should have: { image: string }
 *
 */
const ImageSliderWithThumbnails = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary">
        No images to display.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "0 auto",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Main Slider Area */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 0,
          paddingBottom: "66.666%", // 3:2 Aspect Ratio
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: 2,
          marginBottom: 2,
          backgroundColor: "#f0f0f0",
        }}
      >
        {/* Arrows */}
        <IconButton
          aria-label="Previous"
          onClick={handlePrev}
          sx={{
            position: "absolute",
            top: "50%",
            left: 8,
            transform: "translateY(-50%)",
            color: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.6)" },
            zIndex: 2,
          }}
        >
          <ArrowBackIosNew fontSize="small" />
        </IconButton>

        <IconButton
          aria-label="Next"
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: 8,
            transform: "translateY(-50%)",
            color: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.6)" },
            zIndex: 2,
          }}
        >
          <ArrowForwardIos fontSize="small" />
        </IconButton>

        {/* Main Image */}
        {images.map((img, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${img.image})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              transition: "opacity 0.5s ease",
              opacity: currentIndex === index ? 1 : 0,
            }}
          />
        ))}
      </Box>

      {/* Thumbnails */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {images.map((img, index) => (
          <Box
            key={index}
            onClick={() => handleThumbnailClick(index)}
            sx={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              cursor: "pointer",
              overflow: "hidden",
              border: index === currentIndex ? "2px solid #1976d2" : "2px solid transparent",
              transition: "border 0.3s ease",
              backgroundColor: "#f8f8f8",
              boxShadow: 1,
              backgroundImage: `url(${img.image})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              "&:hover": { opacity: 0.8 },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ImageSliderWithThumbnails;