import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import { Star, StarBorder, Wifi, AcUnit, Tv } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Path from "./Path";
import Dates from "./Dates";
import TripImage from "./TripImage";
import Amenities from "./Amenities";
import Rating from "./Rating";

const TripCard = ({ trip }) => {
  const {
    _id,
    image,
    organizer,
    title,
    from,
    to,
    departureTime,
    arrivalTime,
    fare,
    availableSeats,
    departureSlot,
    bus,
  } = trip;
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/book/${_id}`, { state: { id: _id } });
  };



  return (
    <Card sx={{ minWidth: 400 }}>
      <TripImage image={image} departureSlot={departureSlot} title={title} />
      <CardContent>
        <Typography
          variant="h5"
          color="primary"
          gutterBottom
          sx={{ m: 0, fontWeight: "bold" }}
        >
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ m: 0, fontWeight: "bold", color: "gray" }}
        >
          {organizer.name}
        </Typography>
        <Path
          fromCity={from.name}
          fromState={from.state}
          toCity={to.name}
          toState={to.state}
        />
        <Dates arrivalTime={arrivalTime} departureTime={departureTime} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Amenities */}
          <Amenities amenities={bus.amenities}/>
          <Box>{Rating(5)}</Box>
        </Box>
        <Divider sx={{ my: 1 }} />
        {/* fare and button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            gutterBottom
            sx={{ fontSize: "23px", fontWeight: "Bold", mt: 1 }}
          >
            Fare: <span style={{ color: "#04A30C" }}>₹{fare}</span>
          </Typography>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Book Ticket
          </Button>
        </Box>

        <Typography
          variant="body2"
          gutterBottom
          sx={{ color: "green", fontSize: "16px", fontWeight: "bold" }}
        >
          Seats Left: {availableSeats.length} out of {bus.seatingCapacity}
        </Typography>
        <Grid container justifyContent="center"></Grid>
      </CardContent>
    </Card>
  );
};

export default TripCard;
