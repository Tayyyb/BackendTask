import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"


export const verifyJWT = asyncHandler ( async (req, res, next ) => {
  try {
     const token = req.cookies?.accessToken || req.header ("Authorization")?.replace("Bearer", "")
  
      if (!token) {
          throw new ApiError(401,"Unathoriized rquest")
      }
  
      const decodenToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
  
      const user = await User.findById(decodenToken?._id).select("-password -refresh")
  
      if (!user) {
          // NEXT_VEDIO:
          throw new ApiError (401, "Invalid Access Token")
      }
  
      req.user = user;
      next()
  } catch (error) {
    throw new ApiError (401, error?.message || "Invalid access token")
  }
})