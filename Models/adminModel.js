const mongoose = require("mongoose");

const adminModel = new mongoose.Schema(
{
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required!"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Email is required!"],
  },
},
{
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Admin = mongoose.model("admin" , adminModel);
module.exports = Admin;
