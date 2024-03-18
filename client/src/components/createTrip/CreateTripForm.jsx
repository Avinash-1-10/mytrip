import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  Paper,
  Autocomplete,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import axios from "axios";
import BusCards from "./BusCards";

const defaultImage = "https://via.placeholder.com/150?text=Upload+Image"; // Placeholder image URL

const CreateTripForm = () => {
  const [selectedBus, setSelectedBus] = useState("");
  const [fromCities, setFromCities] = useState([]);
  const [toCities, setToCities] = useState([]);
  const [searchData, setSearchData] = useState({
    to: "",
    from:""
  });
  const [title, setTitle] = useState("");
  const [fare, setFare] = useState("");
  const [departureTime, setDepartureTime] = useState(
    format(new Date(), "yyyy-MM-dd'T'HH:mm")
  );
  const [arrivalTime, setArrivalTime] = useState(
    format(new Date(), "yyyy-MM-dd'T'HH:mm")
  );
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectBus = (busId) => {
    setSelectedBus(busId);
  };

  const getFromCities = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/city/allcities`
    );
    setFromCities(data.cities);
  };

  const getToCities = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/city/allcities`
    );
    setToCities(data.cities);
  };

  useEffect(() => {
    getFromCities();
  }, [searchData.from]);

  useEffect(() => {
    getToCities();
  }, [searchData.to]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.set("title", title);
      formData.set("from", searchData.from);
      formData.set("to", searchData.to);
      formData.set("image", selectedImage);
      formData.set("departureTime", departureTime);
      formData.set("arrivalTime", arrivalTime);
      formData.set("fare", fare);
      formData.set("bus", selectedBus);
  
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.accessToken) {
        throw new Error("User not authenticated or access token missing.");
      }
  
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/trip",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.error("Error occurred while submitting form:", error);
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <Paper sx={{ p: 3, px: 5, m: 2 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        color="primary"
        sx={{ fontWeight: "bold" }}
      >
        Create Trip
      </Typography>

      <Grid container spacing={3} mt={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
              />
            ) : (
              <img
                src={defaultImage}
                alt="Default"
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
              />
            )}
            <input
              accept="image/*"
              id="image-upload"
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="image-upload">
              <Button
                variant="contained"
                component="span"
                color="primary"
                sx={{ mt: 2 }}
              >
                Upload Image
              </Button>
            </label>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="title"
            label="Title"
            type="string"
            InputLabelProps={{ shrink: true }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="fare"
            label="Fare"
            type="number"
            InputLabelProps={{ shrink: true }}
            value={fare}
            onChange={(e) => setFare(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            fullWidth
            disablePortal
            id="from-combo-box"
            options={fromCities}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option) => option.name}
            onChange={(_, newValue) => {
              setSearchData({
                ...searchData,
                from: newValue ? newValue._id : "",
              });
            }}
            renderInput={(params) => (
              <TextField {...params} label="From" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            fullWidth
            disablePortal
            id="to-combo-box"
            options={toCities}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option) => option.name}
            onChange={(_, newValue) => {
              setSearchData({
                ...searchData,
                to: newValue ? newValue._id : "",
              });
            }}
            renderInput={(params) => (
              <TextField {...params} label="To" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="departure-time"
            label="Departure Time"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="arrival-time"
            label="Arrival Time"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} sx={{display:"flex", justifyContent:"center"}}>
            <BusCards selectedBus={selectedBus} handleSelectBus={handleSelectBus}/>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreateTripForm;
