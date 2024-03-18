import React from "react";
import { Box, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

const Path = ({ fromCity, fromState, toCity, toState }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb:1
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
          variant="body1"
          gutterBottom
          sx={{ fontSize: "30px", m: 0, fontWeight: 600, color: "#E70069" }}
        >
          {fromCity}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: "gray",mt: "-7px" }}>
          {fromState}
        </Typography>
      </Box>
      <ArrowForward sx={{ verticalAlign: "middle", mx: 1 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontSize: "30px", m: 0, fontWeight: 600, color: "#E70069" }}
        >
          {toCity}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: "gray",mt: "-7px" }}>
          {toState}
        </Typography>
      </Box>
    </Box>
  );
};

export default Path;
