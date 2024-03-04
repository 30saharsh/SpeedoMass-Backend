const mongoose = require("mongoose");

const jobuserModel = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Firstname is required!"],
    },
    lastname: {
        type: String,
        required: [true, "Lastname is required!"],
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
    appliedposition: {
      type: String,
      required: [true, "Applied Position is mandatory!"],
    },
    pinterviewdate: {
      type: String,
      required: [true, "Interview Date is required!"],
    },
    coverletter: {
        type: String,
        required: [true, "Cover Letter is required!"],
      },
      filename: {
        type: String,
      },
  },
  { 
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const JobUser = mongoose.model("jobuser", jobuserModel);
module.exports = JobUser;
