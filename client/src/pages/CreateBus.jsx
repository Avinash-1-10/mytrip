import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  IconButton,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import axios from "axios";
const defaultImage = "https://via.placeholder.com/150?text=Upload+Image";

const CreateBus = () => {
  const [busNumber, setBusNumber] = useState("");
  const [image, setImage] = useState(null);
  const [type, setType] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(false);
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("busNumber", busNumber);
    formData.append("image", image);
    formData.append("type", type);
    formData.append("amenities", amenities.join(", "));
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/bus",
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(data);
  };

  const handleAmenitiesChange = (event) => {
    const { value } = event.target;
    setAmenities((prevAmenities) => {
      if (prevAmenities.includes(value)) {
        return prevAmenities.filter((amenity) => amenity !== value);
      } else {
        return [...prevAmenities, value];
      }
    });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto" }}>
      <Typography
        variant="h4"
        align="center"
        color="primary"
        sx={{ fontWeight: "bold", mt: 3 }}
        gutterBottom
      >
        Add New Bus
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mt: 2 }}>
          <input
            accept="image/*"
            id="image-upload"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ display: "none" }}
          />
          {image ? (
            <img
              src={URL.createObjectURL(image)}
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
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
          >
            <label htmlFor="image-upload">
              <Button variant="contained" component="span">
                Upload Image
              </Button>
            </label>
          </div>
        </Box>
        <TextField
          fullWidth
          label="Bus Number"
          value={busNumber}
          onChange={(e) => setBusNumber(e.target.value)}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <MenuItem value="AC-2+1">AC-2+1</MenuItem>
            <MenuItem value="AC-2+2">AC-2+2</MenuItem>
            <MenuItem value="AC-1+1">AC-1+1</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <label>Amenities</label>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={amenities.includes("WiFi")}
                  onChange={handleAmenitiesChange}
                  value="WiFi"
                />
              }
              label="WiFi"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={amenities.includes("AC")}
                  onChange={handleAmenitiesChange}
                  value="AC"
                />
              }
              label="AC"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={amenities.includes("TV")}
                  onChange={handleAmenitiesChange}
                  value="TV"
                />
              }
              label="TV"
            />
            {/* Add more amenities checkboxes as needed */}
          </FormGroup>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CreateBus;
