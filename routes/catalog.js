const express = require('express')
const router = express.Router()
const VideogameController = require('../controllers/videogameController')

/* GET users listing. */
router.get('/', VideogameController.index)
router.get('/game/:id', VideogameController.videogamePage)

module.exports = router
