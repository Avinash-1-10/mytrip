import City from "../models/city.model.js";

const getAllCities = async (req, res) => {
  try {
    const { cityName, page = 1 } = req.query;
    let allCities;
    const pageSize = 10;
    const pageNumber = parseInt(page);

    const skipCount = (pageNumber - 1) * pageSize;

    if (cityName) {
      allCities = await City.aggregate([
        { $match: { name: { $regex: cityName, $options: "i" } } },
        { $skip: skipCount },
        { $limit: pageSize }
      ]);
    } else {
      allCities = await City.find()
    }

    res.status(200).json({ status: 200, cities: allCities });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};




const addCity = async (req, res) => {
  try {
    const { name, state } = req.body;
    const existingCity = await City.findOne({ name, state });

    if (existingCity) {
      return res.status(400).json({ message: "City already exists" });
    }

    const city = await City.create({ name, state });
    res.status(201).json({ status: 201, city });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

export { getAllCities, addCity };
