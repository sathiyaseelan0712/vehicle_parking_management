const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const indexRoute = require("./routes/index.route");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", indexRoute);

mongoose
  .connect(process.env.MONGO_URI,)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
