import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  location: String,
  image: String, // ✅ Add this field
});

export default mongoose.model("Program", ProgramSchema);
