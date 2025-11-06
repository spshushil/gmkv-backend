import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  designation: String,
}, { timestamps: true });

export default mongoose.model("Member", memberSchema);
