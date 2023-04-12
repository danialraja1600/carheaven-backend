const { Schema, model } = require("mongoose");

const carSchema = new Schema(
  {
    imageURL: {
      type: String,
      required: [true, "Image is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    year: {
      type: String,
      required: [true, "Year is required."],
    },
    anyIssues: {
      type: String,
      required: [true, "Any Issues is required."]
    },
    price: {
        type: Number,
        required: [true, "Price is required. "]
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("Car", carSchema);

module.exports = Car;
