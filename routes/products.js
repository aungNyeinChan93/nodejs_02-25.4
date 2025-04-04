const router = require("express").Router();
const ProductController = require("../controllers/productController");

router.get("/", ProductController.all);
router.get("/:name", ProductController.show);
router.post("/", ProductController.create);
router.put("/:name", ProductController.modify);
router.delete("/:name", ProductController.destroy);

module.exports = router;
