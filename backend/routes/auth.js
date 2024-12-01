const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const sendverificationcode = require('../middleware/Email');
const welcomeemail = require('../middleware/welcome');
const fetchuser = require('../middleware/fetchuser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const JWT_SECRET = 'Sohailisthegreatboy'; 
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads');
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); 
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
  
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName); 
  }
});







const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false); 
    }
  }
});











router.use('/uploads', express.static(path.join(__dirname, 'uploads')));


router.post('/updatebanner', upload.single('banner'), async (req, res) => {
  const { email } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const bannerUrl = `http://localhost:5000/uploads/${req.file.filename}`;


    console.log('Uploaded file:', bannerUrl);
    console.log('Email:', email);

 
    user.banner = bannerUrl;
    await user.save();


    return res.status(200).json({ success: true, message: "Banner image uploaded successfully", bannerUrl });
  } catch (error) {
    console.error("Server error:", error.message);
    return res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
});

router.post('/updateprofile', upload.single('profile'), async (req, res) => {
  const { email } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const user = await User.findOne({ email });
    if (!user) {


      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    const profileUrl = `http://localhost:5000/uploads/${req.file.filename}`;

 
    console.log('Uploaded profile image:', profileUrl);
    console.log('Email:', email);

  
    user.profile = profileUrl;
    await user.save();


    return res.status(200).json({ success: true, message: "Profile image uploaded successfully", profileUrl });
  } catch (error) {
    console.error("Server error:", error.message);
    return res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
});































router.post('/getimage', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const bannerImgUrl = user.banner || null;
    const profileImgUrl = user.profile || null;

    res.status(200).json({
      success: true,
      bannerImgUrl,
      profileImgUrl,
    });

    console.log("Images retrieved successfully");
  } catch (error) {
    console.error("Error retrieving images:", error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



































































// User registration route
router.post('/createuser', [
  body('name', 'Enter a valid name (at least 3 characters)').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  body('wallet', 'Enter a valid wallet address (minimum 42 characters)').isLength({ min: 42 }),
], async (req, res) => {

  
  let success = false;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: "Sorry, a user with this email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
      wallet: req.body.wallet,
      verificationcode: verificationCode,
    });

    const data = { user: { id: user.id } };
    const token = jwt.sign(data, JWT_SECRET);

    success = true;

    await sendverificationcode(user.email, verificationCode);

    return res.status(200).json({ success, token });
  } catch (error) {
    console.error("Error creating user:", error.message);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});




// Email verification route
router.post('/verify', async (req, res) => {
  console.log("Received request:", req.body);

  try {
    const { code, email } = req.body;
    const user = await User.findOne({ verificationcode: code, email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or Expired Code" });
    }

    user.isverified = true;
    user.verificationcode = undefined; // Clear the verification code
    await welcomeemail(user.name, user.email); // Send welcome email
    await user.save();

    return res.status(200).json({ success: true, message: "Email Verified Successfully" });
  } catch (error) {
    console.error("Server error:", error.message);
    return res.status(500).json({ success: false, message: "Server side Error" });
  }
});










router.post('/Forgot_verify', async (req, res) => {
  try {
    const { code, email } = req.body;

    // Check if all required fields are provided
    if (!code || !email) {
      return res.status(400).json({ success: false, message: "Code and email are required." });
    }

    // Find the user with the provided email and code
    const user = await User.findOne({ verificationcode: code, email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or Expired Code" });
    }

   
    // Code verification successful
    return res.status(200).json({ success: true, message: "Email Verified Successfully" });

  } catch (error) {
    console.error("Server error:", error.message);
    return res.status(500).json({ success: false, message: "Server side Error" });
  }
});

















router.post('/reset-password', async (req, res) => {
  try {
    const { email,password } = req.body;


   
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or Expired Code" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    user.password = secPass;

    await user.save();

   
    
    return res.status(200).json({ success: true, message: "Password Reset Successfully " });

  } catch (error) {
    console.error("Server error:", error.message);
    return res.status(500).json({ success: false, message: "Server side Error" });
  }
});
























// Resend OTP route
router.post('/reverify', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate a new verification code
    const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationcode = newVerificationCode;
    await user.save();

    // Send the verification code to user's email
    await sendverificationcode(user.email, newVerificationCode);

    return res.status(200).json({ success: true, message: "OTP resent successfully" });
  } catch (error) {
    console.error("Error resending OTP:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});






















// User login route
router.post('/login', [
  body('email', 'Enter valid email e.g email123@gmail.com').isEmail(),
  body('password', 'Enter a valid password e.g pass123 > 5 ').isLength({ min: 5 })
], async (req, res) => {
  let success = false;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    // Check if the user is verified
    if (!user.isverified) {
      return res.status(400).json({ success: true, verify: false, error: "Please verify the Email first" });
    }

    const data = { user: { id: user.id } };
    const token = jwt.sign(data, JWT_SECRET);
    success = true;

    return res.json({ success, token, verify: true });
  } catch (error) {
    console.error("Error logging in:", error.message);
    return res.status(500).json({ success: false, error: "Some error occurred" });
  }
});

// Get user data route
router.post('/getdata', fetchuser, async (req, res) => {
  let success = false;
  try {
    let userid = req.user.id;
    const user = await User.findById(userid).select("-password"); // Exclude password from response
    success = true;
    res.json({ success, user });
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({ success, message: "Internal Server Error" });
  }
});





router.post('/emailverify', async (req, res) => {
  let success = false;

  // Extract email
  const { email } = req.body;

  // Log email for debugging
  console.log('Email received:', email);

  if (!email) {
    return res.status(400).json({ success, error: 'Email is required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success, error: 'User not found. Please check your email.' });
    }

    // If user found, set success to true
    success = true;
    return res.status(200).json({ success});
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    return res.status(500).json({ success, message: 'Internal Server Error' });
  }
});


module.exports = router;
