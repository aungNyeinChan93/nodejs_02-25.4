const router = require("express").Router();

const CategoryController = require("../controllers/categoryController");

router.use('/', (req, res, next) => {
    // Middleware for logging requests
    console.log("Request received at /api/categories middleware");
    next();
});

router.get('/', CategoryController.all);
router.get('/:name', CategoryController.show);
router.post('/', CategoryController.create);
router.put('/:name', CategoryController.modify);
router.delete('/:name', CategoryController.destroy);


module.exports = router;