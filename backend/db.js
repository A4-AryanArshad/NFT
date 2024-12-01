const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/NFTAuthentication";

const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(() => console.log("Connected"))
        .catch((e) => console.log(e.message));
};

// Correctly exporting the function
module.exports = connectToMongo;
