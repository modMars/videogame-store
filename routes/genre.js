const express = require('express')
const router = express.Router()
const GenreController = require('../controllers/genreController')

/* GET users listing. */
router.get('/', GenreController.index)
router.get('/create', GenreController.genre_create_get)
router.post('/create', GenreController.genre_create_post)
router.get('/:id', GenreController.genre_detail)
router.get('/:id/update', GenreController.genre_update_get)
router.post('/:id/update', GenreController.genre_update_post)
router.get('/:id/delete', GenreController.genre_delete_get)
router.post('/:id/delete', GenreController.genre_delete_post)

module.exports = router
