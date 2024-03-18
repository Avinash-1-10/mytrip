import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import TripDetails from "../components/trip/TripDetails";

const Book = () => {
  const [trip, setTrip] = useState(null);
  const location = useLocation();
  const id = location.state?.id || location.pathname.split("/")[2];
  const getTrip = async (req, res) => {
    const { data } = await axios.get(`http://localhost:8000/api/v1/trip/${id}`);
    setTrip(data.data);
  };
  useEffect(() => {
    getTrip();
  }, []);
  return <div>{trip ? <TripDetails trip={trip}/> : <h2>Trip Not found</h2>}</div>;
};

export default Book;
