import React from "react";
import { Grid, Typography, Card, CardMedia, CardContent } from "@mui/material";

const images = [
  {
    title: "Cityscape",
    imageUrl: "https://source.unsplash.com/featured/?city,travel",
    description:
      "Explore the bustling streets, enchanting neighborhoods, and iconic landmarks of vibrant cities.",
  },
  {
    title: "Beach",
    imageUrl: "https://source.unsplash.com/featured/?beach,travel",
    description:
      "Relax on pristine shores and soak up the sun with breathtaking beach views.",
  },
  {
    title: "Mountains",
    imageUrl: "https://source.unsplash.com/featured/?mountains,travel",
    description:
      "Embark on exhilarating hikes and witness stunning mountain landscapes.",
  },
  {
    title: "Forest",
    imageUrl: "https://source.unsplash.com/featured/?forest,travel",
    description:
      "Immerse yourself in the tranquility of lush forests and reconnect with nature.",
  },
  {
    title: "Desert",
    imageUrl: "https://source.unsplash.com/featured/?desert,travel",
    description:
      "Experience the vastness of arid deserts and marvel at their unique beauty.",
  },
  {
    title: "Road Trip",
    imageUrl: "https://source.unsplash.com/featured/?road,travel",
    description:
      "Hit the open road and embark on an unforgettable journey of discovery.",
  },
];

const Gallery = () => {
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s",
  };

  const mediaStyle = {
    height: 0,
    paddingTop: "56.25%", // 16:9
  };

  return (
    <div style={{ flexGrow: 1, padding: "20px" }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ color: "#1876D1", fontWeight: "bold", my: 2, mb: 5 }}
      >
        Discover Your Next Adventure
      </Typography>
      <Grid container spacing={3}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={cardStyle}>
              <CardMedia
                style={mediaStyle}
                image={image.imageUrl}
                title={image.title}
              />
              <CardContent>
                <Typography variant="h6" component="h2">
                  {image.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {image.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Gallery;
