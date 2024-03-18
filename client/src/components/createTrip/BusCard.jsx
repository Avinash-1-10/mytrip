import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const BusCard = ({ bus, isSelected, onSelect }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Card
      sx={{
        minWidth: isSmallScreen ? 250 : isMediumScreen ? 300 : 350,
        backgroundColor: isSelected ? "#FC75AB" : "#fff",
        cursor: bus.isAvailable ? "pointer" : "default",
        transition: "background-color 0.3s ease",
      }}
      onClick={bus.isAvailable ? () => onSelect(bus._id) : null}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={bus.image}
          alt={bus.busNumber}
        />
        <CardContent sx={{ color: isSelected ? "white" : "black" }}>
          <Typography gutterBottom variant="h5">
            {bus.busNumber}
          </Typography>
          <Typography gutterBottom variant="h6">
            {bus.operator.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Type: {bus.type}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Capacity: {bus.seatingCapacity}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            {bus.isAvailable ? (
              <span
                style={{
                  background: "#05BD3C",
                  padding: "3px 6px",
                  borderRadius: 5,
                  color: "white",
                }}
              >
                Available
              </span>
            ) : (
              <span
                style={{
                  background: "red",
                  padding: "3px 6px",
                  borderRadius: 5,
                  color: "white",
                }}
              >
                Not Available
              </span>
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BusCard;
