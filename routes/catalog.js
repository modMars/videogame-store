const express = require('express')
const router = express.Router()
const VideogameController = require('../controllers/videogameController')

/* GET users listing. */
router.get('/', VideogameController.index)
router.get('/game/create', VideogameController.videogame_create_get)
router.post('/game/create', VideogameController.videogame_create_post)
router.get('/game/:id/update', VideogameController.videogame_update_get)
router.post('/game/:id/update', VideogameController.videogame_update_post)
router.get('/game/:id/delete', VideogameController.videogame_delete_get)
router.post('/game/:id/delete', VideogameController.videogame_delete_post)
router.get('/game/:id', VideogameController.videogame_detail)

module.exports = router
