import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import SnackBar from "../components/errors/SnackBar";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setAlert] = useState(false);
  const [isError, setError] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("http://localhost:8000/api/v1/user/login", {
        email,
        password,
      })
      .then((data) => {
        setAlert(true);
        setError(false);
        setAlertMsg(data?.data?.message);
        localStorage.setItem("user", JSON.stringify(data.data.data.user));
        localStorage.setItem("accessToken", data.data.data.accessToken);
        setInterval(() => {
          setLoading(false);
          navigate("/");
          window.location.reload()
        }, 1000);
      })
      .catch((err) => {
        setAlert(true);
        setError(true);
        setAlertMsg(err?.response?.data?.message || "An Error Occured");
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
        onSubmit={handleLogin}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              variant="outlined"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ textAlign: "center" }}>
              New to MyTrip? <Link to="/register">Register now</Link>
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

export default Login;
