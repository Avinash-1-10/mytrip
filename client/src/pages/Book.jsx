import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import TripDetails from "../components/trip/TripDetails";
import { CircularProgress, Typography, Box } from "@mui/material";

const Book = () => {
  const [trip, setTrip] = useState(null);
  const location = useLocation();
  const id = location.state?.id || location.pathname.split("/")[2];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getTrip = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/trip/${id}`
      );
      setTrip(data.data);
    } catch (error) {
      setError("Failed to fetch trip details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrip();
  }, []);

  return (
    <div>
      {loading ? (
        <Box
          sx={{
            width: "100%",
            height: "700px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box
          sx={{
            width: "100%",
            height: "700px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color="error" sx={{ textAlign: "center" }}>
            {error}
          </Typography>
        </Box>
      ) : trip ? (
        <TripDetails trip={trip} />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "700px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Trip Not found
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default Book;
