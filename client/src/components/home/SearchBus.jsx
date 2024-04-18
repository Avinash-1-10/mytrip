import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, IconButton } from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBus = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(dayjs("2022-04-17"));
  const [fromCities, setFromCities] = useState([]);
  const [toCities, setToCities] = useState([]);
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    date: value,
  });

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

  const handleSearchData = (e) => {
    e.preventDefault();
    const date = searchData.date && new Date(searchData.date);
    if (searchData.from && searchData.to && searchData.date) {
      navigate(
        `/trips/from=${searchData.from}&to=${searchData.to}&date=${Date.parse(
          date
        )}`,
        {
          state: {
            from: searchData.from,
            to: searchData.to,
            date: Date.parse(date),
          },
        }
      );
      window.location.reload()
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url("https://wallpaperaccess.com/full/1431622.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "0 10px",
      }}
    >
      <Box
        component="form"
        sx={{
          background: "rgba(255, 255, 255, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          mx: 5,
          flexWrap: "wrap",
          width: "100%",
          padding: 3,
          borderRadius: 3,
          backdropFilter: "blur(10px)",
        }}
        onSubmit={handleSearchData}
      >
        <Autocomplete
          disablePortal
          id="from-combo-box"
          options={fromCities}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option) => option.name}
          sx={{ width: "100%", maxWidth: 300 }}
          onChange={(_, newValue) => {
            setSearchData({
              ...searchData,
              from: newValue ? newValue._id : "",
            });
          }}
          renderInput={(params) => (
            <TextField {...params} label="From" variant="outlined" required />
          )}
        />
        <Autocomplete
          disablePortal
          id="to-combo-box"
          options={toCities}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option) => option.name}
          sx={{ width: "100%", maxWidth: 300 }}
          onChange={(_, newValue) => {
            setSearchData({ ...searchData, to: newValue ? newValue._id : "" });
          }}
          renderInput={(params) => (
            <TextField {...params} label="To" variant="outlined" required />
          )}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            sx={{ width: "100%", maxWidth: 300 }}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              setSearchData({ ...searchData, date: newValue });
            }}
          />
        </LocalizationProvider>
        <IconButton type="submit">
          <SendIcon color="primary" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SearchBus;
