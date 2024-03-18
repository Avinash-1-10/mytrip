import axios from 'axios'
import React, { useEffect, useState } from 'react'
import TripCard from './TripCard'
import { Box } from '@mui/material'

const TripsSection = () => {
  const [trips, setTrips] = useState([])
  const getTrips = async()=>{
    const {data} = await axios.get("http://localhost:8000/api/v1/trip")
    setTrips(data.data);
  }
  useEffect(()=>{
    getTrips()
  },[])
  return (
    <Box sx={{display:"flex", justifyContent:"center", m:3, gap:3, flexWrap:"wrap"}}>
      {
        trips.map((trip)=><TripCard key={trip._id} trip={trip}/>)
      }
    </Box>
  )
}

export default TripsSection