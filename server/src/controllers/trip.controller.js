import { ac1_1, ac2_1, ac2_2 } from "../data/seats.js";
import Bus from "../models/bus.model.js";
import Trip from "../models/trip.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const getDepartureSlot = function (dateString) {
  const t = dateString.slice(11, 13);
  if (+t >= 4 && +t < 12) {
    return "Morning";
  } else if (+t >= 12 && +t < 16) {
    return "Afternoon";
  } else if (+t >= 16 && +t < 20) {
    return "Evening";
  } else {
    return "Night";
  }
};

const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate({
        path: "organizer",
        select:
          "-_id -password -contactNumber -role -createdAt -updatedAt -__v -refreshToken",
      })
      .populate({
        path: "from",
        select: "-_id -__v",
      })
      .populate({
        path: "to",
        select: "-_id -__v",
      })
      .populate({
        path: "bus",
        select:
          "-_id -__v -createdAt -updatedAt -isAvailable -operator -busNumber -image -isAvailable",
      })
      .select("-__v -createdAt -updatedAt");

    return res
      .status(200)
      .json(new ApiResponse(200, trips, "Trips successfully retrieved"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error));
  }
};

const createTrip = async (req, res) => {
  const { title, from, to, departureTime, arrivalTime, fare, bus } = req.body;
  const tripImageLocalPath = req.file?.path;
  try {
    if (
      !title ||
      !from ||
      !to ||
      !departureTime ||
      !arrivalTime ||
      !fare ||
      !bus ||
      !tripImageLocalPath
    ) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "All fields are required"));
    }
  
    const image = await uploadOnCloudinary(tripImageLocalPath);
    const departureSlot = getDepartureSlot(departureTime);
    const bookedBus = await Bus.findById(bus);

    if (!bookedBus.isAvailable) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Selected bus is not available"));
    }
    const trip = new Trip({
      organizer: req.user._id,
      title,
      from,
      to,
      departureTime,
      arrivalTime,
      fare,
      bus,
      departureSlot,
      image: image.url,
    });
    if (bookedBus.seatingCapacity == 14) {
      trip.availableSeats = ac1_1;
    } else if (bookedBus.seatingCapacity == 21) {
      trip.availableSeats = ac2_1;
    } else if(bookedBus.seatingCapacity == 28){
      trip.availableSeats = ac2_2;
    }

    await trip.save();
    bookedBus.isAvailable = false;
    await bookedBus.save();

    return res
      .status(201)
      .json(new ApiResponse(201, trip, "Trip is successfully added"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const getTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const trip = await Trip.findById(tripId).populate("from").populate("to").populate("organizer").populate("bus");
    if (!trip) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Trip not found"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, trip, "Trip successfully retrieved"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};


export { createTrip, getTrip, getTrips };
