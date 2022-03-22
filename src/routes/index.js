const { Router } = require("express");
const router = Router();
const videogame = require('./videogame')
const videogames = require('./videogames');
const genres = require('./genres')

router.use('/api/videogames', videogames);
router.use('/api/genres', genres);
router.use('/api/videogame', videogame);

module.exports = router;

