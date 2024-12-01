const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const nftSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  expirationDate: { type: Date, required: true },
  collection: { type: String },
  royalties: { type: String },
  image: { type: String, required: true }, // URL to the uploaded image
}, { timestamps: true });

module.exports = mongoose.model('NFT', nftSchema);