const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    country: {
      type: String,
      required: [true, "Country is required!"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required!"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone is required!"],
    },
    serviceRequired: {
      type: String,
      required: [true, "Service required is mandatory!"],
    },
    message: {
      type: String, 
      // required: [true, "Message is required!"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const User = mongoose.model("user", userModel);
module.exports = User;
