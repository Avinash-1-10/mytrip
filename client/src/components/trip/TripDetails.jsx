import React,{useState} from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import Path from "./Path";
import Dates from "./Dates";
import Ac2_2 from "../bus/Ac2_2";
import TripImage from "./TripImage";
import Ac2_1 from "../bus/Ac2_1";
import Ac1_1 from "../bus/Ac1_1";
import Amenities from "./Amenities";
import Rating from "./Rating";
import TicketDetails from "../ticket/TicketDetails";

const BookingPage = ({ trip }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  return (
    <Grid container spacing={2} p={3}>
      {/* Trip Details */}
      <Grid item xs={12} md={7} sx={{ border: "1px solid #DAF1FD" }}>
        <Box elevation={3} style={{ padding: "20px" }}>
          {/* Trip Image */}
          <TripImage
            image={trip.image}
            w={400}
            departureSlot={trip.departureSlot}
            title={trip.title}
          />
          {/* Organizer */}
          <Typography
            variant="h6"
            color="primary"
            sx={{ fontSize: "30px", my: 1, fontWeight: "bold" }}
          >
            {trip.organizer.name}
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
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Amenities amenities={trip.bus.amenities} />
            <Box>{Rating(2.5)}</Box>
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontSize: "27px",
              my: 1,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Select Seats
          </Typography>
          {trip.bus.type === "AC-2+1" ? (
            <Ac2_1 selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} bookedSeats={trip.bookedSeats}/>
          ) : trip.bus.type === "AC-2+2" ? (
            <Ac2_2 selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} bookedSeats={trip.bookedSeats}/>
          ) : (
            <Ac1_1 selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} bookedSeats={trip.bookedSeats}/>
          )}

          <Paper sx={{ height: "300px", display: "flex", flexWrap: "wrap", borderRadius:"5px" }}>
            <img
              src={trip.bus.image}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover",borderRadius:"5px" }}
            />
          </Paper>
        </Box>
      </Grid>

      {/* Ticket Details */}
      <Grid item xs={12} md={5}>
        <Box elevation={3} style={{ padding: "20px" }}>
          <TicketDetails selectedSeats={selectedSeats} fare={trip.fare} trip={trip._id}/>
        </Box>
      </Grid>
    </Grid>
  );
};

export default BookingPage;
