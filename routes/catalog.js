const express = require('express')
const router = express.Router()
const VideogameController = require('../controllers/videogameController')

/* GET users listing. */
router.get('/', VideogameController.index)
router.get('/game/create', VideogameController.videogameCreateGet)
router.post('/game/create', VideogameController.videogameCreatePost)
router.get('/game/:id/delete', VideogameController.videogameDeleteGet)
router.post('/game/:id/delete', VideogameController.videogameDeletePost)
router.get('/game/:id', VideogameController.videogamePage)

module.exports = router
