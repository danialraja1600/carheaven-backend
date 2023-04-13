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
    error: err, // and error itself is sent back using an error property
    });
    }
    });
// try, catch blocks used for better error handling, preventing the app from crashing 

// GET Event by Id
router.get("/:eventId", async(req, res, next) => { // extracting eventId from request params 
    const { eventId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(eventId)) { // checking if it is a valid MongoDb ObjectId.
        res.status(400).json({ message: "Specified Id is not valid" }); // if not valid, 400 bad request response is sent with a message
        return;
    }

    try {
        const event = await Event.findById(eventId); // if eventId is valid, an event is searched for that has the same Id using findById()
        if(!event){
            return res.status(404).json({ message: 'Event Not Found' });// 404 Not Found response sent back with a message, if there is no
            // event matching with that Id
        }
        res.json(event); // if the event is found, 200 OK response is sent back with the event object as the response payload
    }
    catch(err) {
        console.log("error getting details of the event", err);
        res.status(500).json({ // if there is an error finding the event, error is logged and sends back a 500 Internal Server Error
            //response with a message
        message: "error getting details of the event",
        error: err,
        // the error object sent back as the response payload 
        });
        }
        });







    module.exports = router;