// This is the backup server for the main server
const express = require("express");
const app = express();
app.use(express.json());

const backup = () => {

    app.listen(3001, () => {
        console.log("Backup server is running on port 3001");
    });

    // home
    const homeRouter = require("./routes/home");
    app.use("/backup/api/home", homeRouter);

    const test = () => {
        console.log("Test route accessed");
    }

    return { test }

}
const callTest = () => backup().test();


// module.exports = {
//     backup,
//     callTest
// };

exports.backup = backup;
exports.callTest = callTest;