import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { basicAuth } from "./basicauth-middleware.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// Rate limit for /lead
const leadLimiter = rateLimit({
  windowMs: 5 * 1000,
  max: 15,
  handler: (req, res) => {
    return res.status(429).json({
      status: "Fail",
      message: "Lead API exceeded 15 requests per 30 seconds",
    });
  },
});

// Rate limit for /login
const loginLimiter = rateLimit({
  windowMs: 20 * 1000, // 20 seconds
  max: 20,
  handler: (req, res) => {
    return res.status(429).json({
      status: "Fail",
      message: "Login attempts exceeded 5 per minute",
    });
  },
});

// Apply only to specific routes
app.post("/limiter-1/lead", leadLimiter, (req, res) => {
  res.json({ status: "Success", message: "Lead created successfully" });
});

app.post("/limiter-2/login", loginLimiter, (req, res) => {
  res.json({ status: "Success", message: "Lead created successfully" });
});

app.post("/secure/basic-auth", basicAuth, (req, res) => {
  res.json({
    status: "Success",
    message: "Lead created successfully",
  });
});


app.listen(3000, () => console.log("Server running on port 3000"));
