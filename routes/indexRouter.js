const express = require("express");
const router = express.Router();
const {
  homepage,
  homepagedata,
  contactpagedata,
  jobuserdata,
  AdminCreateUser,
  AdminLogin,
  viewhomepagedata,
  viewcontactdata,
  viewjobdata,
} = require("../controllers/indexController");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() 
    cb(null,uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

// Main Website Form's API's

//GET
router.get("/", homepage);

router.post("/homedata", homepagedata); // Home Page Form Submission 

router.post("/contactdata", contactpagedata); // Contact Form Submission

router.post("/jobuserdata", upload.single('file') , jobuserdata ) // Job Application Form


// Admin Panel API's
router.post("/createadmin" , AdminCreateUser); // ****Create Admin API ( No Frontend Involved )****

router.post("/adminlogin" , AdminLogin); // Admin Login 

router.get("/viewhomedata" , viewhomepagedata); // Home Page Form Data View For Admin Panel

router.get("/viewcontactdata" , viewcontactdata); // Contact Page Form Data View For Admin Panel

router.get("/viewjobdata" , viewjobdata); // Job Application Page Form Data View For Admin Panel



module.exports = router;
