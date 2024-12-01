const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')
// Call the function to connect to MongoDB
connectToMongo();
const port = 6000;
var app = express()

app.use(cors());  // Enable CORS for all routes

// Middleware to parse JSON bodies
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));

app.use('/api/nft', require('./routes/nft'));



// Start server
app.listen(port, () => {
  console.log(`NFT Authentication Backend Listening at http://localhost:${port}`)
});
