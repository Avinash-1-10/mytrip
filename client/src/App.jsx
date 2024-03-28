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
import Book from "./pages/Book";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  console.log();
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trips/:info" element={<Trips />} />
        <Route
          path="/book/:id"
          element={
            <ProtectedRoute>
              <Book />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/create-trip"
          element={
            <ProtectedRoute>
              <CreateTrip />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-bus"
          element={
            <ProtectedRoute>
              <CreateBus />
            </ProtectedRoute>
          }
        />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
