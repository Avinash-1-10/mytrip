import React, { useEffect, useState } from "react";
import TripsSection from "../components/trip/TripsSection";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Trips = () => {
  const location = useLocation();
  const [trips, setTrips] = useState([]);

  const getTrips = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/trip?from=${location.state.from}&to=${location.state.to}&date=${location.state.date}`
    );
    setTrips(data.data);
  };
  useEffect(() => {
    getTrips();
  }, []);
  return (
    <div>
      <TripsSection trips={trips} />
    </div>
  );
};

export default Trips;
