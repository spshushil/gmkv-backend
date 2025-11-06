import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

async function testMail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "✅ Test Email Working",
    text: "This is a test email from GMKV Yoga Trust."
  });

  console.log("✅ Test email sent!");
}

testMail();
