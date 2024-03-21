import { Box, Button, Paper } from "@mui/material";
import React, { useState } from "react";

const Ac2_2 = ({selectedSeats,setSelectedSeats, bookedSeats}) => {
  const lw = ["LW1", "LW2", "LW3", "LW4", "LW5", "LW6", "LW7"];
  const la = ["LA1", "LA2", "LA3", "LA4", "LA5", "LA6", "LA7"];
  const ra = ["RA1", "RA2", "RA3", "RA4", "RA5", "RA6", "RA7"];
  const rw = ["RW1", "RW2", "RW3", "RW4", "RW5", "RW6", "RW7"];

  const toggleSeatSelection = (seat) => {
    if (bookedSeats.includes(seat)) return; // Don't select if the seat is booked
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((selected) => selected !== seat));
    } else {
      if (selectedSeats.length < 5) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const Seat = ({ seat }) => {
    const isBooked = bookedSeats.includes(seat);
    const isSelected = selectedSeats.includes(seat);
    return (
      <Button
        disabled={isBooked}
        variant="outlined"
        sx={{
          bgcolor: isSelected ? "#1876D0": "white",
          color:isSelected ? "white": "#1876D0",
          "&:hover": {
            color: "#1876D0"
          },
        }}
        onClick={() => toggleSeatSelection(seat)}
      >
        {seat}
      </Button>
    );
  };

  return (
    <Paper
      sx={{
        display: "flex",
        gap: 5,
        p: 3,
        justifyContent: "center",
        alignItems: "center",
        my:3
      }}
    >
      {/* Left */}
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Left window */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {lw.map((seat) => (
            <Seat seat={seat} key={seat} />
          ))}
        </Box>
        {/* Left Aisle */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {la.map((seat) => (
            <Seat seat={seat} key={seat} />
          ))}
        </Box>
      </Box>

      {/* Right */}
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Right window */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {rw.map((seat) => (
            <Seat seat={seat} key={seat} />
          ))}
        </Box>
        {/* Right Aisle */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {ra.map((seat) => (
            <Seat seat={seat} key={seat} />
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default Ac2_2;
