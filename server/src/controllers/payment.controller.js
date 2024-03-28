import Ticket from "../models/ticket.model.js";
import instance from "../utils/razorpay.js";
import crypto from "crypto";
import ApiResponse from "../utils/ApiResponse.js";
import Trip from "../models/trip.model.js";

const checkout = async (req, res) => {
  const { amount, trip: tripId, seats } = req.body;
  const user = req.user;

  if(!amount || !tripId || !seats){
    return res.status(400).json(new ApiResponse(400, null, "Every Field is required"))
  }
  try {
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    if (order) {
      const ticket = new Ticket({
        trip: tripId,
        user: user._id,
        seats,
        totalFare: amount,
      });
      const trip = await Trip.findById(tripId); // Use tripId instead of trip
      for (const seat of seats) {
        // Check if the seat is already booked
        if (trip.bookedSeats.includes(seat)) {
          return res.status(400).json(new ApiResponse(400, null, `Seat ${seat} is already booked`))
        }
      }
      trip.bookedSeats = [...trip.bookedSeats, ...seats];
      await trip.save(); // Ensure to await the save operation
      await ticket.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { order, ticket: ticket._id },
            "Ticket and order created successfully"
          )
        );
    }
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};


const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, ticket } =
      req.body;
    const data = `${razorpay_order_id}|${razorpay_payment_id}`;

    const calculatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(data)
      .digest("hex");

    const isSignatureValid = calculatedSignature === razorpay_signature;

    if (isSignatureValid) {
      const userTicket = await Ticket.findById(ticket);
      userTicket.paymentStatus = "success";
      userTicket.paymentId = razorpay_payment_id;
      await userTicket.save()
      res.status(200).json(new ApiResponse(200, {ticketId:userTicket._id}, "Success"));
    } else {
      res.status(400).json({ success: false, error: "Invalid signature" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const getKey = (req, res) => {
  try {
    res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { checkout, verifyPayment, getKey };
