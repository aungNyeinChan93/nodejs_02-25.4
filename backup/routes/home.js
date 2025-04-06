const router = require("express").Router();

router.get('/', (req, res) => {
    res.send("Welcome to the home page of backup server!");
    console.log("Home route accessed");
});

module.exports = router;