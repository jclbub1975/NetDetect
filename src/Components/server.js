import express, { json } from "express";
import cors from "cors";
import { createTransport } from "nodemailer";
require("dotenv").config();

const app = express();
app.use(cors());
app.use(json());

// Nodemailer transporter setup
const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,          // Your Gmail address
    pass: process.env.EMAIL_PASSWORD, // App password
  },
});

// API endpoint to send the email
app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL, // Your Gmail address
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ message: "Error sending email", error });
    }
    res.status(200).send({ message: "Message sent successfully!" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
