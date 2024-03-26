import React, { useEffect, useState } from "react";
import TripsSection from "../components/trip/TripsSection";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Box, Typography, Grid } from "@mui/material";
import { ErrorOutlineOutlined, LocationOffOutlined } from "@mui/icons-material";

const Trips = () => {
  const location = useLocation();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getTrips = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/trip?from=${location.state.from}&to=${location.state.to}&date=${location.state.date}`
      );
      setTrips(data.data);
    } catch (error) {
      setError("Failed to fetch trips. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // getTrips();
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
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <ErrorOutlineOutlined color="error" style={{ fontSize: 48 }} />
          </Grid>
          <Grid item>
            <Typography variant="h5" color="error">
              {error}
            </Typography>
          </Grid>
        </Grid>
      ) : trips.length > 0 ? (
        <TripsSection trips={trips} />
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{
            width: "100%",
            height: "700px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item>
            <LocationOffOutlined color="disabled" style={{ fontSize: 48 }} />
          </Grid>
          <Grid item>
            <Typography variant="h5">No trips found!</Typography>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Trips;
