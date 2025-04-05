const { MongoClient } = require("mongodb");

const uri = 'mongodb://localhost:27017/test_02'; // Replace with your MongoDB connection string

let connection;

const connectDB = (cb) => {
    MongoClient.connect(uri)
        .then(client => {
            console.log("Connected to MongoDB");
            connection = client.db(); // Replace with your database name
            cb();
        })
        .catch(error => {
            console.error("Error connecting to MongoDB:", error);
            cb(error);
        });
}

const getConnection = () => connection;


module.exports = { connectDB, getConnection };