const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    imageURL: {
      type: String,
      required: [true, "Image is required."],
    },
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    location: {
      type: String,
      required: [true, "Location is required."],
    },
    time: {
      type: String,
      required: [true, "Time is required."]
    },
    requirements: {
        type: String,
        required: [true, "Requirements are required. "]
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("Event", eventSchema);

module.exports = Event;
