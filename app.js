const express = require("express");

const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
const deviceRoute = require("./routes/deviceRoute");
const userRoute = require("./routes/userRoute");
const sensorRoute = require("./routes/sensorRoute");

// Path
app.use("/devices", deviceRoute);
app.use("/user", userRoute);
app.use("/sensor", sensorRoute);

// Middleware Error's
const MiddlewareError = require("./middleware/MiddlewareError");
app.use(MiddlewareError);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.clear();
  console.log(`Server is running on port: ${PORT}`);
});
