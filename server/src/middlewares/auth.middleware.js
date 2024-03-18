import jwt from 'jsonwebtoken'; // Import jsonwebtoken library
import User from '../models/user.model.js';
import ApiResponse from '../utils/ApiResponse.js';

const verifyJwt = async (req, res, next) => {
  try {
   const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, 'Unauthorized request'));
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      '-password -refreshToken'
    );
    if (!user) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, 'Invalid access token'));
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          error.message || 'Something went wrong while verifying token'
        )
      );
  }
};

export default verifyJwt;
