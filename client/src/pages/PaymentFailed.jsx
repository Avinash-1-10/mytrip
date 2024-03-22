import React from 'react'
import { Card, Typography, Box } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const PaymentFailed = () => {
  return (
    <div
      style={{
        height:"60vh",
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
        minWidth: "300px",
        textAlign:"center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 2,
          alignItems: "center",
          gap: 2,
        }}
      >
         <ErrorOutlineIcon sx={{ color: "#F44336", fontSize: 60 }} />
        <Box>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                Payment Failed
              </Typography>
              <Typography variant="body1" gutterBottom>
                We're sorry, but your payment could not be processed.
              </Typography>
              <Typography variant="body1" gutterBottom>
                Please check your payment details and try again.
              </Typography>
              <Typography variant="body1" gutterBottom>
                If you continue to experience issues, please contact customer support.
              </Typography>
        </Box>
      </Card>
    </div>
  )
}

export default PaymentFailed
