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
    fare: {
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
    bus: {
      type: Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
