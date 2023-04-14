const router = require("express").Router();

const mongoose = require("mongoose");
const {isAuthenticated} = require("../middleware/jwt.middleware");
const Car = require("../models/Car.model");

// Create a car
// Taking in JSON data from client request to create new car object
router.post("/", isAuthenticated, (req, res, next) => {
    const car = {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      user: req.payload._id,
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
  router.put("/:carId", isAuthenticated , async(req, res, next) => { //updates a specific car object by its MongoDB ID primary key
    const { carId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(carId)) { //checks if the given ID is valid
      return res.status(400).json({ message: "Specified id is not valid" });
  }

  try { // if carId is valid, it finds the car with provided id
    const car = await Car.findById(carId);

    // Check if the car exists
    if (!car) { //checking if variable is truthy 
      return res.status(404).json({ message: 'Car not found' });
    // if not, return error response, status code 404
  }

    // Check if the logged-in user is the creator of the car
    // if statement checking if user making req, is the creator of the car
    console.log(car);
    if(car.user._id.toString() !== req.payload._id) {
    // comparing users id with id of car creator after converting it to a string
    // must convert to string. cant compare a string and an ObjectId type of variable
      return res.status(403).json({ message: 'Unauthorized' });
    // if they don't match, return error response with status code 403
  }

    // Update "updatedAt" field
    req.body.updatedAt = Date(); // updating the date with date of update
    // updating car
    const updatedCar = await Car.findByIdAndUpdate(carId, req.body, { new: true });
    // using findByIdAndUpdate method to update the car with new data recieved through req body
    res.json(updatedCar); // rerturns updated car in the response
    }
    // if any error occurs, catch block is executed.
    catch (err) { 
    console.log("error updating car", err);
    res.status(500).json({ // server responds with error message and status code 500
    message: "error updating car",
    error: err,
    });
    }
    });

router.delete("/:carId", isAuthenticated, async(req, res, next) => {
    //function deletes specific car object by its ID primary key
    const { carId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(carId)) {
        res.status(400).json({message: "Specified is not valid" });
        return;
    }
    // first must check if given Id is valid
    //returns a message response if it is
    const car = await Car.findById(carId);

    // Check if the car exists
    if (!car) { //checking if variable is truthy 
      return res.status(404).json({ message: 'Car not found' });
      // if not, return error response, status code 404
    }

      // Check if the logged-in user is the creator of the car
      // if statement checking if user making req, is the creator of the car
    console.log(car);
    if(car.user._id.toString() !== req.payload._id) {
      // comparing users id with id of car creator after converting it to a string
      // must convert to string. cant compare a string and an ObjectId type of variable
        return res.status(403).json({ message: 'Unauthorized' });
      // if they don't match, return error response with status code 403
    }
    
    // if Id is valid then this function is executed
    // deletes the car object with thjat Id from the database
    Car.findByIdAndRemove(carId)
        .then(() =>
            res.json({
            message: `Car with ${carId} is removed successfully.`, //succesful message if all went well
    })
    )
        .catch((err) => {
            console.log("error deleting selected car", err);
            res.status(500).json({
                message: "error deleting selected car",
                error: err,
            });
        });
        });
          

  module.exports = router; //exporting router object so that it can be used by other modules in the app