const router = require('express').Router()
const SuperHeroController = require('../controllers/superHeroController')

router.use('/', (req, res, next) => {
    console.log(`hit /api/superHeros !`);
    next()
})

router.get('/', SuperHeroController.all)
router.post('/', SuperHeroController.create)
router.patch('/skillAdd/:id', SuperHeroController.skillAdd)
router.patch('/skillBan/:id', SuperHeroController.skillBan)

module.exports = router