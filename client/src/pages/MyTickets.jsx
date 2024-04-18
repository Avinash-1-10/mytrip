import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";

const TicketCard = ({ ticket }) => {
  return (
    <Card sx={{ height: "fit-content", minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Trip: {ticket?.trip}
        </Typography>
        <Typography color="textSecondary">
          Payment ID: {ticket?.paymentId}
        </Typography>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <Typography color="textSecondary">Payment Status:</Typography>
          <Typography
            bgcolor={ticket?.paymentStatus === "success" ? "green" : "yellow"}
            sx={{ color: "white", px: "5px", borderRadius: "10px" }}
          >
            {ticket?.paymentStatus}
          </Typography>
        </div>
        <Typography color="textSecondary">
          Seats: {ticket?.seats.join(", ")}
        </Typography>
        <Typography variant="body2" component="p">
          Total Fare: {ticket?.totalFare}
        </Typography>
      </CardContent>
    </Card>
  );
};

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading indicator
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/ticket/user/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setTickets(response.data.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };
    fetchTickets();
  }, [user._id, accessToken]);

  if (tickets.length === 0) {
    return (
      <div
        style={{
          width: "100vw",
          height: "50vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>Ticket not found</h3>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "50px",
        minHeight: "50vh",
      }}
    >
      {loading ? ( // Show loading indicator if loading is true
        <CircularProgress color="primary" />
      ) : (
        tickets.map((ticket, index) => (
          <TicketCard key={index} ticket={ticket} />
        ))
      )}
    </div>
  );
};

export default MyTickets;
