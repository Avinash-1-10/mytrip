import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Divider,
  CardMedia,
} from "@mui/material";
import {
  Star,
  StarBorder,
  Wifi,
  AcUnit,
  Tv,
  ArrowForward,
  ArrowRight,
} from "@mui/icons-material";
import LightModeIcon from "@mui/icons-material/LightMode";
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import NightlightIcon from '@mui/icons-material/Nightlight';
// Morning: #FFD700 (Gold)
// Noon: #FFA500 (Orange)
// Evening: #FF6347 (Tomato)
// Night: #483D8B (DarkSlateBlue)

const TripCard = ({ trip }) => {
  const {
    image,
    organizer,
    title,
    from,
    to,
    departureTime,
    arrivalTime,
    fare,
    bookedSeats,
    availableSeats,
    departureSlot,
    bus,
  } = trip;

  const calculateRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <Star key={index} sx={{ color: "gold" }} />
        ))}
        {hasHalfStar && <StarHalf sx={{ color: "gold" }} />}
        {[...Array(remainingStars)].map((_, index) => (
          <StarBorder key={index} sx={{ color: "gold" }} />
        ))}
      </>
    );
  };

  return (
    <Card sx={{ minWidth: 400 }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia component="img" height="200" image={image} alt={title} />
        <Box
          sx={{
            background: `${
              departureSlot === "Morning"
                ? "#EFC902"
                : departureSlot === "Afternoon"
                ? "#FFA500"
                : departureSlot === "Evening"
                ? "#FF6347"
                : "#483D8B"
            }`,
            position: "absolute",
            top: 0,
            right: 0,
            color: "white",
            px: 2,
            py: "6px",
            display: "flex",
            borderRadius: "0 0 0 10px",
          }}
        >
            {
              departureSlot === "Morning"
                ? <LightModeIcon />
                : departureSlot === "Afternoon"
                ? <LightModeIcon />
                : departureSlot === "Evening"
                ? <WbTwilightIcon/>
                : <NightlightIcon/>
            }
          
        </Box>
        <Box
          sx={{
            background: "#04A30C",
            position: "absolute",
            top: 0,
            left: 0,
            color: "white",
            px: 2,
            py: 1,
            display: "flex",
            borderRadius: "0 0 10px 0",
          }}
        >
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
            20% OFF
          </Typography>
        </Box>
      </Box>
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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
              {from.name}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: "gray" }}>
              {from.state}
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
              {to.name}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: "gray" }}>
              {to.state}
            </Typography>
          </Box>
        </Box>

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
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {new Date(departureTime).toLocaleTimeString()}
            </Typography>
          </Box>

          <ArrowRight sx={{ verticalAlign: "middle" }} />

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
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {new Date(arrivalTime).toLocaleTimeString()}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ mr: 1, display: "flex", gap: 2 }}>
            <Wifi />
            <AcUnit />
            <Tv />
          </Box>
          <Box>{calculateRatingStars(5)}</Box>
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
          <Button variant="contained" color="primary">
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
