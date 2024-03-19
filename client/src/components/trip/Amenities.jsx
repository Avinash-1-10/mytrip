import React from "react";
import { Box } from "@mui/material";
import { Wifi, AcUnit, Tv } from "@mui/icons-material";
const Amenities = ({ amenities }) => {
  return (
    <Box sx={{ mr: 1, display: "flex", gap: 2 }}>
      {amenities.includes("WiFi") && <Wifi />}
      {amenities.includes("TV") && <Tv />}
      {amenities.includes("AC") && <AcUnit />}
    </Box>
  );
};

export default Amenities;
