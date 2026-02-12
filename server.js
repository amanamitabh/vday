require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // important
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    family: 4 // forces IPv4
  }
});

app.post("/send-love", async (req, res) => {
  try {
    const mailOptions = {
      from: `"Aman" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_REC,
      subject: "She Said YES ❤️",
       
      text: `
  —— Reservation Confirmed —— 
A table for 2 has been reserved for us. 💌

Date: 14th February 2026
Time: 12:30 PM
Location: Pastel Poetry

No cancellations allowed. 💋
        `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

