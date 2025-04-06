const router = require("express").Router();
const ProductController = require("../controllers/productController");

router.get("/", ProductController.all);
router.get('/onlyName', ProductController.onlyName);
router.post("/", ProductController.create);
router.post("/many", ProductController.createMany);
router.get("/:name", ProductController.show);
router.put("/:name", ProductController.modify);
router.delete("/:id", ProductController.destroy);

// modify by price
router.patch("/updatePrice/:price", ProductController.updatePrice);

// delete by price
router.delete("/many/:price", ProductController.destroyMany);

// filter by price & name
router.get('/:name/:price', ProductController.filter)

// addColor by id
router.patch('/addColor/:id', ProductController.addColor);


module.exports = router;
