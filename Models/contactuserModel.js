const mongoose = require("mongoose");

const contactuserModel = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Full Name is required!"],
    },
    lastname: {
        type: String,
        required: [true, "Last Name is required!"],
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
      type: Number,
      required: [true, "Phone is required!"],
    },
    country: {
        type: String,
        required: [true, "Country is required!"],
      },
    subject: {
      type: String,
      required: [true, "Subject required is mandatory!"],
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

const contactUser = mongoose.model("contactuser", contactuserModel);
module.exports = contactUser;
