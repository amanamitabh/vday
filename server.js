require("dotenv").config();
const express = require("express");
const path = require("path");
const { Resend } = require("resend");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Send-love route
app.post("/send-love", async (req, res) => {
  try {
    const response = await resend.emails.send({
      from: process.env.EMAIL_USER, // must be verified in Resend
      to: process.env.EMAIL_REC,
      subject: "She Said YES ❤️",
      html: `
        <h2>—— Reservation Confirmed ——</h2>
        <p>A table for 2 has been reserved for us. 💌</p>

        <p><strong>Date:</strong> 14th February 2026</p>
        <p><strong>Time:</strong> 12:30 PM</p>
        <p><strong>Location:</strong> Pastel Poetry</p>

        <p>No cancellations allowed 💋</p>
      `,
    });

    console.log("Resend response:", response);
    res.json({ success: true });

  } catch (error) {
    console.error("Resend error:", error);
    res.status(500).json({ success: false });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
