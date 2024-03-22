import React, { useEffect, useState } from "react";
import { Card, Typography, Box, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const location = useLocation();
  const ticketId = location.state?.ticketId || "65fbeb2bd699b43460b07a38";
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState();

  const getTicket = async (req, res) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/ticket/${ticketId}`
      );
      setTicket(data.data);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    getTicket();
  }, []);
  return (
    <div
      style={{
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "300px",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
            alignItems: "center",
            gap: 2,
          }}
        >
          <CheckCircleIcon sx={{ color: "#4CAF50", fontSize: 60 }} />
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              Payment Successful
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <span style={{ fontWeight: "bold" }}>Ticket Id:</span>{" "}
              {ticket?._id}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <span style={{ fontWeight: "bold" }}>Trip Id:</span>{" "}
              {ticket?.trip}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ mb: 1 }}>
              <span style={{ fontWeight: "bold" }}>Seats:</span>{" "}
              {ticket?.seats.join(", ")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <span style={{ fontWeight: "bold" }}>Total Fare:</span> ₹
              {ticket?.totalFare}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <span style={{ fontWeight: "bold" }}>Payment ID:</span>{" "}
              {ticket?.paymentId}
            </Typography>
          </Box>
        </Card>
      )}
    </div>
  );
};

export default PaymentSuccess;
