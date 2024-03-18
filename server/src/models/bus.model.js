import mongoose from "mongoose";

const { Schema } = mongoose;

const busSchema = new Schema(
  {
    operator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    busNumber: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      enum: ["AC-2+1", "AC-2+2", "AC-1+1"],
    },
    seatingCapacity: {
      type: Number,
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
    amenities: [String],
  },
  { timestamps: true }
);

const seatingCapacityMap = {
  "AC-2+1": 21,
  "AC-2+2": 28,
  "AC-1+1": 14,
};

busSchema.pre("save", async function (next) {
  this.seatingCapacity = seatingCapacityMap[this.type];
  next();
});

const Bus = mongoose.model("Bus", busSchema);

export default Bus;
