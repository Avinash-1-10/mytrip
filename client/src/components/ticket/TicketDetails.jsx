import React from "react";
import { Box, Paper, Typography, Divider, Button } from "@mui/material";

const Section = ({ title, value, bg }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: bg,
        p: 1,
      }}
    >
      <Typography variant="body1">{title}:</Typography>
      <Typography variant="body1">₹{value}</Typography>
    </Box>
  );
};


const TicketDetails = ({ selectedSeats, fare }) => {
  const farePerSeat = fare;
  const discountPercentage = 10;
  const taxPercentage = 5;
  const totalFare = selectedSeats.length * farePerSeat;
  const discountAmount = (totalFare * discountPercentage) / 100;
  const taxAmount = (totalFare - discountAmount) * (taxPercentage / 100);
  const totalAmount = totalFare - discountAmount + taxAmount;

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Ticket Details
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        Selected Seats: {selectedSeats.join(", ")}
      </Typography>
      <Section title="Fare per Seat" value={farePerSeat} bg="#DAF1FD" />
      <Section title="Total Fare" value={totalFare} bg="#F7F7F7" />
      <Section
        title={`Discount (${discountPercentage}%)`}
        value={discountAmount.toFixed(0)}
        bg="#DAF1FD"
      />
      <Section
        title={`Tax (${taxPercentage}%)`}
        value={taxAmount.toFixed(0)}
        bg="#F7F7F7"
      />
      <Divider sx={{ marginY: 2 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Total Amount:
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          ₹{totalAmount.toFixed(0)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Button variant="contained">Proceed Payment</Button>
      </Box>
    </Paper>
  );
};

export default TicketDetails;
