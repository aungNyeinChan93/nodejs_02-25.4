// This is the backup server for the main server
const call = () => {
    const express = require("express");
    const app = express();
    app.use(express.json());

    app.listen(3001, () => {
        console.log("Backup server is running on port 3001");
    });


    // home
    const homeRouter = require("./routes/home");
    app.use("/backup/api/home", homeRouter);


}

module.exports = { call };