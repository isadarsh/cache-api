import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cacheRoute from "./routes/cache.route.js"
import connectDB from "../src/lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(cookieParser()); 

app.use("/cache", cacheRoute);
app.get("/", (req, res) => {
  res.send("Cache API is running!");
});
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

const PORT = process.env.PORT || 5001;

connectDB();

app.listen(PORT, () => {
  console.log("server is running on port: " + PORT);
});
