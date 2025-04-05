const router = require('express').Router();
const TestController = require('../controllers/testController');

router.use('/', (req, res, next) => {
    // Middleware for logging requests
    console.log("Request received at /api/tests middleware");
    next();
});

router.get('/', TestController.all);
router.post('/', TestController.post_create);

module.exports = router;