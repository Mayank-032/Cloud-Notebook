const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook"  // this is the url where database will connect and form database named "inotebook"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to MongoDB successfully")    // when successfully connected with database, return success message
    })
}

module.exports = connectToMongo