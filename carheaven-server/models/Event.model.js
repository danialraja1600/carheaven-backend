const {Schema, model} = require("mongoose");

const eventSchema = new Schema({
  title: {
    type:String,
    required : [true, "Title must be provided"]
  },
  description: {
    type: String,
    required : [true, "Description must be provided"]
  },
  imageUrl: {
    type: String,
    required : [true, "Image must be provided"]
  },
  location:{
    type: String,
    required : [true, "Location must be provided"]
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = model("Event",eventSchema);
module.exports = Event;
