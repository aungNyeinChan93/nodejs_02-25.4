const express = require("express");

const router = express.Router();
const UserController = require("../controllers/user");

let c = 0;
router.use("/", (req, res, next) => {
  // Middleware for logging requests
  c++;
  console.log("Request received at /api/users middleware | Count : " + c);
  next();
});

router.get("/", UserController.all);
router.post("/", UserController.create);
router.get("/:name", UserController.show);
router.put("/:name", UserController.modify);
router.delete("/:name", UserController.destroy);

module.exports = router;
