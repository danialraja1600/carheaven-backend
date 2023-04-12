const router = require("express").Router();

const mongoose = require("mongoose");

const Car = require("../models/Car.model");
const Event = require("../models/Event.model");

// Create a car
router.post("/", (req, res, next) => {
    const car = {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      user: req.body.userID,
      createdAt: Date(),
      updateAt: Date(),
    };
  
    Car.create(car)
      .then((response) => res.status(201).json(response))
      .catch((err) => {
        console.log("error adding a new car", err);
        res.status(500).json({
          message: "error adding a new car",
          error: err,
        });
      });
  });