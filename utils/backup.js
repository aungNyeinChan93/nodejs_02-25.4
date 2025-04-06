const { MongoClient } = require('mongodb');

let connection;

// const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/test?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017/test_0";

const connectDB = (callback) => {
    MongoClient.connect(process.env.DB ?? uri).then(client => {
        connection = client.db();
        console.log("Connected to database");
        callback();

    }).catch(err => {
        console.error("Failed to connect to the database:", err);
        callback(err);
    });
}

const getConnection = () => {
    if (!connection) throw new Error("No connection to the database. Please connect first.");
    return connection;
}

module.exports = {
    connectDB,
    getConnection
}