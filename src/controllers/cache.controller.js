import Cache from "../models/cache.model.js";

const cacheController = {
  store: async (req, res) => {
    try {
      const { key, value } = req.body;

      if (!key || value === undefined) {
        return res.status(400).json({
          success: false,
          message: "Key and value are required",
        });
      }

      const cache = await Cache.findOneAndUpdate(
        { key },
        { key, value },
        { upsert: true, new: true }
      );

      res.status(201).json({
        success: true,
        data: cache,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error storing cache",
        error: error.message,
      });
    }
  },

  get: async (req, res) => {
    try {
      const { key } = req.params;
      const cache = await Cache.findOne({ key });

      if (!cache) {
        return res.status(404).json({
          success: false,
          message: "Cache key not found",
        });
      }

      res.json({
        success: true,
        data: cache,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving cache",
        error: error.message,
      });
    }
  },

  delete: async (req, res) => {
    try {
      const { key } = req.params;
      const cache = await Cache.findOneAndDelete({ key });

      if (!cache) {
        return res.status(404).json({
          success: false,
          message: "Cache key not found",
        });
      }

      res.json({
        success: true,
        message: "Cache entry deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting cache",
        error: error.message,
      });
    }
  },
};

export default cacheController;
