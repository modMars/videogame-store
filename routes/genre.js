const express = require('express')
const router = express.Router()
const GenreController = require('../controllers/genreController')

/* GET users listing. */
router.get('/', GenreController.index)
router.get('/create', GenreController.genreCreateGet)
router.post('/create', GenreController.genreCreatePost)
router.get('/:id', GenreController.genreDetail)

module.exports = router
