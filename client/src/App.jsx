import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateTrip from "./pages/CreateTrip";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import CreateBus from "./pages/CreateBus";
import Trips from "./pages/Trips";
import TripDetails from "./pages/TripDetails";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/trip/:id" element={<TripDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/create-bus" element={<CreateBus />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
