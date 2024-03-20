import mongoose from "mongoose";

const { Schema } = mongoose;


const ticketSchema = new Schema(
  {
    trip: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seatNumber: {
      type: String,
      required: true,
    },
    totalFare: {
      type: Number,
      required: true,
    },
    paymentCompleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["booked", "cancelled"],
      default: "booked",
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
