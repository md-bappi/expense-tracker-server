const exress = require("express");
const projectRoute = require("./routes/projectRoute");
const { PORT } = require("./secret");
const connectDB = require("./config/db");
const createError = require("http-errors");
const { errorResponse } = require("./controllers/ResponseController");
const rateLimit = require("express-rate-limit");
const authRoute = require("./routes/authRoute");
const expenseRoute = require("./routes/expenseRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = exress();

const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100,
  message: "Too many requests, please try again later after 5 minutes",
});

// middlewares
const allowedOrigins = [
  "http://localhost:5173",
  "https://expense-tracker-nu-black.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log(origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(rateLimiter);
app.use(exress.json());
app.use(exress.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/v1/", projectRoute);
app.use("/api/v1/", expenseRoute);
app.use("/api/v1/auth", authRoute);

// clint error handling middleware
app.use((req, res, next) => {
  next(createError(404, "Page not found"));
});

// server error handling middleware
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status || 500,
    message: err.message,
  });
});

app.listen(PORT, async () => {
  try {
    console.log(`Server is running on port ${PORT}`);
    await connectDB();
  } catch (error) {
    console.log(" Server is not running : ", error);
  }
});
