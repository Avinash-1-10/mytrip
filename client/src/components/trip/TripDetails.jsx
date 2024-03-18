import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import Path from "./Path";
import Dates from "./Dates";
import Ac2_2 from "../bues/Ac2_2";
import TripImage from "./TripImage";
import Ac2_1 from "../bues/Ac2_1";
import Ac1_1 from "../bues/Ac1_1";

const BookingPage = ({ trip }) => {
  return (
    <Grid container spacing={2} p={3}>
      {/* Trip Details */}
      <Grid item xs={12} md={7}>
        <Box elevation={3} style={{ padding: "20px" }}>
          {/* Trip Image */}
          <TripImage
            image={trip.image}
            w={400}
            departureSlot={trip.departureSlot}
            title={trip.title}
          />
          {/* Organizer */}
          <Typography variant="h6">{trip.organizer.name}</Typography>
          <Typography variant="subtitle1">
            Rating: {trip.organizer.rating}
          </Typography>
          {/* Path */}
          <Path
            fromCity={trip.from.name}
            fromState={trip.from.state}
            toCity={trip.to.name}
            toState={trip.to.state}
          />
          {/* Date */}
          <Dates
            arrivalTime={trip.arrivalTime}
            departureTime={trip.departureTime}
          />
          {/* Amenities */}
          <Typography variant="body1">
            Amenities: {trip.bus.amenities.join(", ")}
          </Typography>
          {trip.bus.type === "AC-2+1" ? (
            <Ac2_1 />
          ) : trip.bus.type === "AC-2+2" ? (
            <Ac2_2 />
          ) : (
            <Ac1_1 />
          )}
        </Box>
      </Grid>

      {/* Ticket Details */}
      <Grid item xs={12} md={5}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h6">Ticket Details</Typography>
          {/* Add code for displaying ticket details */}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BookingPage;
