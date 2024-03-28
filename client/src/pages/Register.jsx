import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import SnackBar from "../components/errors/SnackBar";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setAlert] = useState(false);
  const [isError, setError] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert(true);
      setError(true);
      setAlertMsg(
        "Passwords do not match. Please check the confirmed password."
      );
      return;
    }
    setLoading(true);
    await axios
      .post("http://localhost:8000/api/v1/user/register", {
        name,
        email,
        contactNumber: contact,
        password,
      })
      .then((data) => {
        setAlert(true);
        setError(false);
        setAlertMsg(data?.data?.message);
        setInterval(() => {
          navigate("/login");
        }, 1000);
        setLoading(false);
      })
      .catch((err) => {
        setAlert(true);
        setError(true);
        setAlertMsg(err?.response?.data?.message);
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
        onSubmit={handleRegister}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              type="number"
              label="Contact"
              variant="outlined"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              type="password"
              label="Confirm Password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? <CircularProgress /> : "Signup"}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account? <Link to="/login">Log in here</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <SnackBar
        open={showAlert}
        setOpen={setAlert}
        isError={isError}
        alertMsg={alertMsg}
      />
    </Container>
  );
};

export default Register;
