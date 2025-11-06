import express from "express";
import Program from "../models/Program.js";
import Member from "../models/Member.js";
import { sendEmailToMembers } from "../utils/SendMail.js";
import multer from "multer";

const router = express.Router();

// ✅ Multer setup for image upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Add new program
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const program = new Program({ title, description, date, location, image });
    await program.save();

    // ✅ Try sending email but don't break if email fails
    try {
      const members = await Member.find();
      if (members.length > 0) {
        await sendEmailToMembers(members, program);
      }
    } catch (emailError) {
      console.log("⚠️ Email sending failed:", emailError.message);
    }

    return res.status(201).json({
      success: true,
      message: "✅ Program added successfully!",
      program,
    });

  } catch (err) {
    console.log("❌ Program Add Error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Error adding program",
      error: err.message,
    });
  }
});

// ✅ Get all programs
router.get("/", async (req, res) => {
  try {
    const programs = await Program.find().sort({ date: -1 });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update program
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const updated = await Program.findByIdAndUpdate(
      req.params.id,
      { title, description, date, location, image },
      { new: true }
    );

    res.json({
      success: true,
      message: "✅ Program updated!",
      updated
    });

  } catch (err) {
    res.status(500).json({ message: "Error updating program" });
  }
});

// ✅ Delete program
router.delete("/:id", async (req, res) => {
  try {
    await Program.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "🗑️ Program deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting program" });
  }
});

// ✅ Must export default
export default router;
