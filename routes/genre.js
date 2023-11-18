const express = require('express')
const router = express.Router()
const GenreController = require('../controllers/genreController')

/* GET users listing. */
router.get('/', GenreController.index)
router.get('/create', GenreController.genreCreateGet)
router.post('/create', GenreController.genreCreatePost)
router.get('/:id', GenreController.genreDetail)
router.get('/:id/delete', GenreController.genreDeleteGet)
router.post('/:id/delete', GenreController.genreDeletePost)

module.exports = router
