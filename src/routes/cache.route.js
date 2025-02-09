import express from "express";
import cacheController from "../controllers/cache.controller.js";
import validateCacheSize from "../middleware/validateCache.middleware.js";

const router = express.Router();

router.post("/", validateCacheSize, cacheController.store);
router.get("/:key", cacheController.get);
router.delete("/:key", cacheController.delete);

export default router;
