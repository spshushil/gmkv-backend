import nodemailer from "nodemailer";

export const sendEmailToMembers = async (members, program) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const subject = `🧘 New Yoga Program: ${program.title}`;

  const htmlMessage = `
    <div style="font-family: Arial, sans-serif; padding:20px; background:#f6f6f6;">
      <div style="max-width:600px; margin:auto; background:white; padding:20px; border-radius:10px; border:1px solid #ddd;">
        
        <h2 style="text-align:center; color:#00897b;">🧘 GMKV Yoga Trust</h2>
        <hr>

        <h3 style="color:#d84315;">${program.title}</h3>

        ${program.image ? `
          <img src="http://localhost:5000${program.image}" 
            alt="Program Image"
            style="width:100%; max-height:300px; object-fit:cover; border-radius:10px; margin:10px 0;">
        ` : ""}

        <p style="font-size:16px; color:#333;">
          ${program.description}
        </p>

        <p style="font-size:16px;">
          <strong>📅 Date:</strong> ${new Date(program.date).toLocaleDateString()} <br>
          <strong>📍 Location:</strong> ${program.location}
        </p>

        

        <br>
        <hr>
        <p style="font-size:14px; color:#555; text-align:center;">
          With love and peace,<br>
          <strong>GMKV Yoga Trust</strong>
        </p>
      </div>
    </div>
  `;

  const mailList = members.map((m) => m.email);

  const mailOptions = {
    from: `"GMKV Yoga Trust" <${process.env.EMAIL_USER}>`,
    to: mailList,
    subject,
    html: htmlMessage,
  };

  await transporter.sendMail(mailOptions);
};
