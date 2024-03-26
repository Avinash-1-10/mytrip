import React from "react";
import { Box, Paper, Typography, Divider, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const TicketDetails = ({ selectedSeats, fare, trip }) => {
  const navigate = useNavigate();
  const farePerSeat = fare;
  const discountPercentage = 10;
  const taxPercentage = 5;
  const totalFare = selectedSeats.length * farePerSeat;
  const discountAmount = (totalFare * discountPercentage) / 100;
  const taxAmount = (totalFare - discountAmount) * (taxPercentage / 100);
  const totalAmount = totalFare - discountAmount + taxAmount;
  const accessToken = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));

  const checkout = async (e) => {
    const {
      data: { key },
    } = await axios.get("http://localhost:8000/api/v1/payment/key");

    const { data } = await axios.post(
      "http://localhost:8000/api/v1/payment/checkout",
      {
        amount: totalAmount,
        trip,
        seats: selectedSeats,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    // console.table(data.data.order.amount);
    const verify = async (info) => {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/payment/verification",
        info
      );
      if (data.success) {
        navigate("/payment-success", {
          state: { ticketId: data.data.ticketId },
        });
      }
    };

    var options = {
      key,
      amount: data.data.order.amount,
      currency: "INR",
      name: "MyTrip",
      description: "Test Transaction",
      image: "https://avatars.githubusercontent.com/u/111282375?v=4",
      order_id: data.data.order.id,
      handler: async function (response) {
        const info = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          ticket: data.data.ticket,
        };
        await verify(info);
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.contactNumber,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      navigate("/payment-failed", { state: { error: response.error.reason } });
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });
    rzp1.open();

    e.preventDefault();
  };

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
        <Button variant="contained" onClick={checkout}>
          Proceed Payment
        </Button>
      </Box>
    </Paper>
  );
};

export default TicketDetails;
