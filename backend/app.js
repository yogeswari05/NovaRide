const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors"); // cross origin resource sharing
const cookieParser = require("cookie-parser");
const connectToDB = require("./db/db");
const userRouter = require("./routes/user.routes");

dotenv.config();
connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/user", userRouter);

module.exports = app;
