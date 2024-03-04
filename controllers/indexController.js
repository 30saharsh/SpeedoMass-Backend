const contactUser = require("../Models/contactuserModel");
const JobUser = require("../Models/jobuserModel");
const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const Admin = require("../Models/adminModel");

exports.homepage = (req, res, next) => {
  res.send("Hello From SpeedoMass Website Backend");
};
exports.homepagedata = async (req, res, next) => {
  const user = await new User(req.body).save();
  console.log(user);
  res.json({ message: "User Created In Database" });
};
exports.contactpagedata = async (req, res, next) => {
  const contactuser = await new contactUser(req.body).save();
  res.json({ message: "Contact User Created In Database" });
};
exports.jobuserdata = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      appliedposition,
      pinterviewdate,
      coverletter,
    } = req.body;
    const filename = req.file.filename;
    const jobuserdata = await new JobUser({
      firstname,
      lastname,
      email,
      phone,
      appliedposition,
      pinterviewdate,
      coverletter,
      filename,
    }).save();
    return res.json({
      success: true,
      jobuserdata,
    });
  } catch (error) {
    res.json({ status: error });
  }
};
exports.seeresume = async (req, res, next) => {
  try {
    await JobUser.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    console.log(error);
  }
};
exports.AdminCreateUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(typeof password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const userAdmin = new Admin({
      email: email,
      password: hashedPassword,
    });
    await userAdmin.save();
    res.status(200).json({
      message: "Admin Created Successfully",
      admin: userAdmin,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occurred");
  }
};
exports.AdminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.json({ error: "Admin Email Not Found in Database" });
    }
    const comparepassword = await bcrypt.compare(password, admin.password);
    if (!comparepassword) {
      return res.json({ error: "Password is wrong" });
    }
    res.status(200).json({
      success: true,
      message: "Admin Login Successfull",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occurred");
  }
};
exports.viewhomepagedata = async (req, res, next) => {
  try {
    const ITServiceData = await User.find();
    res.status(200).json({
      success: true,
      message: "IT Service Data Fetched Successfully",
      ITServiceData,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occurred");
  }
};
exports.viewcontactdata = async (req, res, next) => {
  try {
    const ContactUsData = await contactUser.find();
    res.status(200).json({
      success: true,
      message: "Contcat Us Data Fetched Successfully",
      ContactUsData,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occurred");
  }
};
exports.viewjobdata = async (req, res, next) => {
  try {
    const JobApplications = await JobUser.find();
    res.status(200).json({
      success: true,
      message: "Job Applications Fetched Successfully",
      JobApplications,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occurred");
  }
};