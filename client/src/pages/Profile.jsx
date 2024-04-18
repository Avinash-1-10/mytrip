import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Box,
  Paper,
} from "@mui/material";

const Profile = () => {
  // const [user] = useState({
  //   name: "Avinash Yede",
  //   email: "avinash@gmail.com",
  //   contactNumber: 1029384756,
  //   avatar:
  //     "https://www.bing.com/th?id=OIP.avb9nDfw3kq7NOoP0grM4wHaEK&w=216&h=110&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2",
  //   role: "User",
  //   rating: 5,
  // });
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.role);

  return (
    <Container maxWidth="md" sx={{ paddingY: 4, minHeight: "60vh" }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography
          variant="h3"
          align="center"
          color="primary"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Profile
        </Typography>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "center" }}
          ></Grid>
          <Grid item xs={12} sm={8}>
            <Box sx={{}}>
              <Typography variant="h6">Name: {user.name}</Typography>
              <Typography variant="subtitle1">Email: {user.email}</Typography>
              {user?.role !== "customer" && (
                <Typography variant="subtitle1">
                  Rating: {user.rating}
                </Typography>
              )}
              <Typography variant="subtitle1">
                Contact Number: {user.contactNumber}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile;
