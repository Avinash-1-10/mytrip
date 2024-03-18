import React from "react";
import { Grid, Typography, Card, CardContent } from "@mui/material";

const features = [
  {
    title: "Easy Booking",
    description: "Book your bus tickets hassle-free with our easy-to-use booking system.",
  },
  {
    title: "Wide Coverage",
    description: "Choose from a wide range of destinations and travel routes across the country.",
  },
  {
    title: "Comfortable Travel",
    description: "Travel in comfort and style with our modern fleet of buses and amenities.",
  },
  {
    title: "24/7 Customer Support",
    description: "Get assistance anytime, anywhere with our round-the-clock customer support.",
  },
];

const Features = () => {
  return (
    <div style={{ padding: "20px", background: "#f9f9f9" }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ color: "#1876D1", fontWeight: "bold", my: 2, mb: 5 }}>
        Top Features
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <img src="https://wallpapercave.com/wp/wp9185501.jpg" alt="Travel Image" style={{ width: "100%", height: "auto", maxHeight: "400px", objectFit: "cover" }} />
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={8} container spacing={2}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card style={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" component="div" style={{ fontWeight: "bold" }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Features;
