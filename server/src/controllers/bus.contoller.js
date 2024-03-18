import Bus from "../models/bus.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const createBus = async (req, res) => {
  // console.log('hi')
  try {
    const { busNumber, type, amenities } = req.body;
    const busImageLocalPath = req.file?.path;

    if (!busNumber || !type || !amenities || !busImageLocalPath) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "All fields are required"));
    }

    const image = await uploadOnCloudinary(busImageLocalPath);
    const newBus = new Bus({
      busNumber,
      type,
      amenities: amenities.split(", "),
      image: image.url,
      operator: req.user._id,
    });

    await newBus.save(); // Wait for the bus instance to be saved

    return res
      .status(201)
      .json(new ApiResponse(201, newBus, "Bus created successfully"));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const getBus = async (req, res) => {
  try {
    const allBuses = await Bus.find()
      .select("-createdAt -updatedAt -__v")
      .populate({
        path: "operator",
        select: "-_id -password -role -createdAt -updatedAt -__v -refreshToken",
      });

    res.json(new ApiResponse(201, allBuses, "Buses fetched successfully"));
  } catch (error) {}
};

export { createBus, getBus };
