import React from "react";
import { Box, Typography } from "@mui/material";
const Dates = ({ departureTime, arrivalTime }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{ fontSize: "22px", m: 0, fontWeight: "bold" }}
        >
          {new Date(departureTime).toLocaleDateString("ind")}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom sx={{mt:"-7x"}}>
          {new Date(departureTime).toLocaleTimeString()}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{ fontSize: "22px", m: 0, fontWeight: "bold" }}
        >
          {new Date(arrivalTime).toLocaleDateString("ind")}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom sx={{mt:"-7x"}}>
          {new Date(arrivalTime).toLocaleTimeString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default Dates;
