import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URL as string).then(() => {
  console.log("connected to MONGO");
});

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("succes");
});

app.listen(3000, () => {
  console.log("listening");
});
