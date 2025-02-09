import Cache from "../models/cache.model.js";
import dotenv from "dotenv";

dotenv.config();

const validateCacheSize = async (req, res, next) => {
  try {
    const count = await Cache.countDocuments();
    if (count >= process.env.MAX_CACHE_SIZE && req.method === "POST") {
      return res.status(400).json({
        success: false,
        message: `Cache is full. Maximum size of ${process.env.MAX_CACHE_SIZE} reached.`,
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error checking cache size",
      error: error.message,
    });
  }
};

export default validateCacheSize;
