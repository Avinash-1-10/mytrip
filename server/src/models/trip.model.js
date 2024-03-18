import mongoose from "mongoose";

const { Schema } = mongoose;

const tripSchema = new Schema(
  {
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
    fare: {
      type: Number,
      required: true,
    },
    bookedSeats: {
      type: [String],
      default: [],
    },
    availableSeats: {
      type: [String],
      required: true,
    },
    departureSlot: {
      type: String,
      enum: ["Morning", "Afternoon", "Evening", "Night"],
      required: true,
    },
    bus: {
      type: Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },
  },
  { timestamps: true }
);



const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
