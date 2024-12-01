const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const NFT = require('../models/Nft'); // Import your NFT model
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads/nfts');
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
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

router.post('/create', upload.single('image'), async (req, res) => {
  const { name, description, price, expirationDate, collection, royalties } = req.body;

  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Image is required' });
  }

  const imageUrl = `http://localhost:6000/uploads/nfts/${req.file.filename}`;

  try {
    const newNFT = new NFT({
      name,
      description,
      price,
      expirationDate,
      collection,
      royalties,
      image: imageUrl,
    });

    await newNFT.save();

    res.status(201).json({ success: true, message: 'NFT created successfully', nft: newNFT });
  } catch (error) {
    console.error('Error saving NFT:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
