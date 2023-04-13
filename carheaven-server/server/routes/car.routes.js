const router = require("express").Router();

const mongoose = require("mongoose");

const Car = require("../models/Car.model");
const Event = require("../models/Event.model");

// Create a car
// Taking in JSON data from client request to create new car object
router.post("/", (req, res, next) => {
    const car = {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      user: req.body.userID,
      createdAt: Date(), // date function created to return the current time and date
      updateAt: Date(), // date will be updated once a client updates a car
    };
  
    Car.create(car) // Creating and saving new car to datbase
      .then((response) => res.status(201).json(response)) // Sending response back to client with new car object
      .catch((err) => {
        console.log("error adding a new car", err);
        res.status(500).json({
          message: "error adding a new car",
          error: err,
        });
      });
  });

  // Get All Cars
router.get("/", (req, res, next) => { //  Retrieving all cars as response to request from client
    Car.find() // Method being used to fetch all cars from DB. Sending back response to client with array of objects
      .then((carsFromDB) => {
        res.json(carsFromDB);
      })
      .catch((err) => {
        console.log("error getting list of cars", err);
        res.status(500).json({
          message: "error getting list of cars",
          error: err,
        });
      });
  });
// GET car by id
router.get("/:carId", (req, res, next) => { //retrieves a specific car object by its MongoDB ID primary key
    const { carId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(carId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Car.findById(carId) //used to retrieve the car object with that ID from the database -- specified with carId
      .then((car) => res.json(car)) // returning as response to the client
      .catch((err) => {
        console.log("error getting details of the car", err);
        res.status(500).json({
          message: "error getting details of the car",
          error: err,
        });
      });
  });
  // update the car
  router.put("/:carId", (req, res, next) => { //updates a specific car object by its MongoDB ID primary key
    const { carId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(projectId)) { //checks if the given ID is valid
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
    
  req.body.updateAt = Date(); //updating property of car object with current date and time
  Car.findByIdAndUpdate(carId, req.body, { new: true }) //method used to update the car record with the given carId
  //three arguments: the id of the car to update, the new data to update the record with, and options object(indicating we want to return updated version)
    .then((updatedCar) => res.json(updatedCar)) // then method called when the Promise is resolved with the updated record.
    //sending the updated car record as a JSON response to the client.
    .catch((err) => { // catch method called if an error occurs during the process of updating the car record.
      console.log("error updating project", err);
      res.status(500).json({
        message: "error updating project",
        error: err,
      });
    });
});
          

  module.exports = router; //exporting router object so that it can be used by other modules in the app