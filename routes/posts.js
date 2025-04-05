const router = require("express").Router();
const PostController = require("../controllers/postController");

router.use('/', (req, res, next) => {
    // Middleware for logging requests
    console.log("Request received at /api/posts middleware");
    next();
});

// router
router.get('/', PostController.all)
router.post('/', PostController.create)
router.get('/:userId', PostController.getByUserId)
router.delete('/:title', PostController.destroy)

module.exports = router;