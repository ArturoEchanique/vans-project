const express = require("express");

const logger = require("morgan");

const cookieParser = require("cookie-parser");

// const cors = require("cors");

module.exports = (app) => {
  app.set("trust proxy", 1);

  // app.use(
  //   cors()
  // )

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, GET, DELETE"
      )
      return res.status(200).json({})
    }
    next()
  })

  // {
  //   origin: process.env.ORIGIN || "http://localhost:3000",
  //   }

  app.use(logger("dev"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
