import React, { useEffect, useState } from "react";
import BusCard from "./BusCard";
import { Container, Typography, Button, Box } from "@mui/material";
import axios from "axios";

const BusCards = ({ selectedBus, handleSelectBus }) => {
  const [buses, setBues] = useState([]);

  const getBuses = async () => {
    const { data } = await axios.get("http://localhost:8000/api/v1/bus");
    setBues(data.data);
  };
  useEffect(() => {
    getBuses();
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h4"
        color="primary"
        sx={{ textAlign: "center", mb: 2, fontWeight: "bold", my: 2 }}
      >
        Select Bus
      </Typography>
      <Container sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Typography>Sort by: </Typography>
        <Button variant="contained" sx={{ fontSize: "12px" }}>
          Avaiability
        </Button>
      </Container>
      <Container
        sx={{
          minWidth: "100%",
          display: "flex",
          alignItems: "center",
          gap: 2,
          overflow: "scroll",
          my: 2,
          pl: 2,
          backgroundColor:"#E1F3FA",
          py:2
        }}
      >
        {buses.map((bus) => (
          <BusCard
            key={bus._id}
            bus={bus}
            isSelected={selectedBus === bus._id}
            onSelect={handleSelectBus}
          />
        ))}
      </Container>
    </Box>
  );
};

export default BusCards;
