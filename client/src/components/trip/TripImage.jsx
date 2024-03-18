import React from "react";
import {
  Typography,
  Box,
  CardMedia,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import NightlightIcon from "@mui/icons-material/Nightlight";

const TripImage = ({image,departureSlot, title, w=200 }) => {
  return (
    <Box sx={{ position: "relative" }}>
        <CardMedia component="img" height={w} image={image} alt={title} />
        <Box
          sx={{
            background: `${
              departureSlot === "Morning"
                ? "#EFC902"
                : departureSlot === "Afternoon"
                ? "#FFA500"
                : departureSlot === "Evening"
                ? "#FF6347"
                : "#483D8B"
            }`,
            position: "absolute",
            top: 0,
            right: 0,
            color: "white",
            px: 2,
            py: "6px",
            display: "flex",
            borderRadius: "0 0 0 10px",
          }}
        >
          {departureSlot === "Morning" ? (
            <LightModeIcon />
          ) : departureSlot === "Afternoon" ? (
            <LightModeIcon />
          ) : departureSlot === "Evening" ? (
            <WbTwilightIcon />
          ) : (
            <NightlightIcon />
          )}
        </Box>
        <Box
          sx={{
            background: "#04A30C",
            position: "absolute",
            top: 0,
            left: 0,
            color: "white",
            px: 2,
            py: 1,
            display: "flex",
            borderRadius: "0 0 10px 0",
          }}
        >
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
            20% OFF
          </Typography>
        </Box>
      </Box>
  )
}

export default TripImage