import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

const check = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const admins = await Admin.find({});
  console.log("Admins in DB:", admins);

  mongoose.connection.close();
};

check();
