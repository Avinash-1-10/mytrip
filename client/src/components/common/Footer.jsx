import React from "react";
import { Box, Container, Grid, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "#1876D0", color: "#fff", py: 4, mt: 10 }}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">About Us</Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum eros in nisi
              fermentum, sit amet laoreet nisi condimentum.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Quick Links</Typography>
            <Typography variant="body2">
              <Link href="#" sx={{ color: "white" }}>Home</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="#" sx={{ color: "white" }}>About</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="#" sx={{ color: "white" }}>Services</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="#" sx={{ color: "white" }}>Contact</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Contact Us</Typography>
            <Typography variant="body2">123 Main Street</Typography>
            <Typography variant="body2">City, State, ZIP</Typography>
            <Typography variant="body2">Email: info@example.com</Typography>
            <Typography variant="body2">Phone: 123-456-7890</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Connect With Us</Typography>
            <Box sx={{ mt: 1 }}>
              <Link href="#" sx={{ mr: 2 }}>
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link href="#" sx={{ mr: 2 }}>
                <i className="fab fa-twitter"></i>
              </Link>
              <Link href="#">
                <i className="fab fa-instagram"></i>
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" align="center">
            &copy; {new Date().getFullYear()} Your Website. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
