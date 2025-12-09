import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors({ origin: "*" }));
// Rate limit: 20 requests per minute per IP
const limiter = rateLimit({
  windowMs: 30 * 1000,
  max: 15,
  handler: (req, res) => {
    return res.status(200).json({
      status: "Fail",
      message: "API calls exceeded the limit of 15 in 30 second(s)"
    });
  }
});

// Apply rate limiter to /lead POST route
app.use("/lead", limiter);

app.post("/lead", (req, res) => {
  return res.status(200).json({
    status: "Success",
    message: "Lead created successfully"
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
