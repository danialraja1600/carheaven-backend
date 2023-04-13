const router = require("express").Router();

const mongoose = require("mongoose");

const Car = require("../models/Car.model");
const Event = require("../models/Event.model");

// GET route  ("/")
// returns a list of events stored in database
router.get("/", async(req, res, next) => {
    //route handler is async function to wait for .find() method
    // using async to prevent code from moving to next line until awaited opertion is complete 
    // better/ easier to maintain and to read
    try{
    eventsFromDB = await Event.find(); // returns list of events 
    res.json(eventsFromDB); // once returned, route handler sends it back to the client as a JSON object
    }
    // if any error occurs during db query, route handler catches error and sends 500 status code
    catch(err){
    console.log("error getting list of events", err);
    res.status(500).json({
    message: "error getting list of events", // also sends JSON object with error message
    error: err, // and error itself is sent back using an errorn property
    });
    }
    });
// try, catch blocks used for better error handling, preventing the app from crashing 

    module.exports = router;