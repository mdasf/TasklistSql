const express = require("express");
const colors = require("colors");
const path = require("path");
var cors = require("cors");
const dotenv = require("dotenv").config();
const mysql = require("mysql");
const { errorHandler } = require("./middleware/errorMiddleware");
const db = require("./config/db");
const port = process.env.PORT || 5000;

corsConfig = {
  origin: "",
  methods: "GET,PUT,POST,DELETE",
  credentials: true,
};

const app = express();
// app.use(cors(corsConfig));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("server/public"));

app.use("/api/goals", require("./routes/goalRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
