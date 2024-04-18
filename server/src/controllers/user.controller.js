import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const genereateAccessAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, contactNumber } = req.body;

    if (!name || !email || !password || !contactNumber) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "All fields are required"));
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { contactNumber: +contactNumber }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json(
          new ApiResponse(
            409,
            null,
            "User with email/phone number already exists"
          )
        );
    }

    const user = await User.create({
      name,
      email,
      password,
      contactNumber: +contactNumber,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -token"
    );

    if (!createdUser) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            null,
            "Something went wrong while registering the user"
          )
        );
    }

    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User registered successfully"));
  } catch (error) {
    console.error("Error registering user:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal server error"));
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "email and password is required"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "User does not exist"));
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Invalid user credentials"));
    }

    const { accessToken, refreshToken } = await genereateAccessAndRefreshTokens(
      user._id
    );
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser, accessToken, refreshToken },
          "User logged In Successfully"
        )
      );
  } catch (error) {}
};

const logout = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
};

// const updateUserAvatar = asyncHandler(async (req, res) => {
//   const avatarLocalPath = req.file?.path;
//   if (!avatarLocalPath) {
//     throw new ApiError(400, "Avatar file is missing");
//   }

//   const avatar = await uploadOnCloudinary(avatarLocalPath);
//   if (!avatar?.url) {
//     throw new ApiError(400, "Error while uploading on avatar");
//   }
//   const user = await User.findByIdAndUpdate(
//     req.user?._id,
//     { $set: { avatar: avatar.url } },
//     { new: true }
//   ).select("-password");

//   return res
//     .status(200)
//     .json(new ApiResponse(200, user, "avatar updated successfully"));
// });

export { registerUser, login, logout };
