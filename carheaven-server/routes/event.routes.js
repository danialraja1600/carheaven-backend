const router = require("express").Router();

const mongoose = require("mongoose");
const {isAuthenticated} = require("../middleware/jwt.middleware");
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

    // Creating a new event through POST req to API endpoint
router.post("/", isAuthenticated, async(req, res, next) => { // before creating event checks if user is authenticated or not
    const event = { // if authenticated, a new event object is created with all these properties
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        status: "upcoming", // Updated field for status
        creator: req.payload._id,
        imageUrl:req.body.imageUrl,
        location:req.body.location,
        createdAt: Date(),
        updatedAt: Date(),
    };
    
    try{
    const response = await Event.create(event); // attempts to save event to database
    console.log(response);
    res.status(201).json(response); // if successful, sends 201 response with saved event object in JSON format
    }
    catch(err) { // if there is any error, error is caught and HTTP 500 response is sent with error message and details
    console.log("error adding a new event", err);
    res.status(500).json({
    message: "error adding a new event",
    error: err,
    });
    };
    });

    // PUT route with endpoint /:eventId to update events
    router.put("/:eventId", isAuthenticated, async (req, res) => { // middleware applied to see if user is authenticated 
        const { eventId } = req.params; // expecting request parameter 
        
        if (!mongoose.Types.ObjectId.isValid(eventId)) { // checking if eventId is valid mongoose objectId
        return res.status(400).json({ message: "Specified ID is not valid" }); // if not returns error message
        }
        
        try { // if eventId is valid, it finds the event with provided id
        const event = await Event.findById(eventId);

        // Check if the event exists
        if (!event) { //checking if variable is truthy 
        return res.status(404).json({ message: 'Event not found' });
        // if not, return error response, status code 404
      }

        // Check if the logged-in user is the creator of the event
        // if statement checking if user making req, is the creator of the event
        if (event.creator.toString() !== req.payload._id) {
        // comparing users id with id of event creator after converting it to a string
        // must convert to string. cant compare a string and an ObjectId type of variable
        return res.status(403).json({ message: 'Unauthorized' });
        // if they don't match, return error response with status code 403
      }

        // Update "updatedAt" field
        req.body.updatedAt = Date(); // updating the date with date of update
        // updating event 
        const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true });
        // using findByIdAndUpdate method to update the event with new data recieved through req body
        res.json(updatedEvent); // rerturns updated event in the response
        }
        // if any error occurs, catch block is executed.
        catch (err) { 
        console.log("error updating event", err);
        res.status(500).json({ // server responds with error message and status code 500
        message: "error updating event",
        error: err,
        });
        }
        });

        router.delete("/:eventId", isAuthenticated , async(req, res, next) => {
                //function deletes specific event object by its ID
                // before creating event checks if user is authenticated or not

            const { eventId } = req.params;
            
            if (!mongoose.Types.ObjectId.isValid(eventId)) { // checks if given Id is valid
            res.status(400).json({ message: "Specified id is not valid" }); //if not rrturns a error message
            return;
            }
            // first must check if given Id is valid
            //returns a message response if it is not
            
            // if it is valid, more auth is carried out
            // checking if user exists
            // checking if ids match before allowing user to delete event 
            try {
            const event = await Event.findById(eventId);

            // Check if the event exists
            if (!event) { //checking if variable is truthy 
            return res.status(404).json({ message: 'Event not found' });
            // if not, return error response, status code 404
          }

            // Check if the logged-in user is the creator of the event
            // if statement checking if user making req, is the creator of the event
            if (event.creator.toString() !== req.payload._id) {
            // comparing users id with id of event creator after converting it to a string
            // must convert to string. cant compare a string and an ObjectId type of variable
            return res.status(403).json({ message: 'Unauthorized' });
            // if they don't match, return error response with status code 403
          }
            // // removes the event object from the database if succesful
            await Event.findByIdAndRemove(eventId);
            res.json({message: `Event with id ${eventId} is removed successfully.`, 
            })
        }
        catch(err) {
            console.log("error deleting event", err);
            res.status(500).json({
            message: "error deleting event",
            error: err,
            });
            };
        });





    module.exports = router;