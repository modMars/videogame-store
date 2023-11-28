const express = require('express')
const router = express.Router()
const PublisherController = require('../controllers/publisherController')

/* GET users listing. */
router.get('/', PublisherController.index)
router.get('/create', PublisherController.publisher_create_get)
router.post('/create', PublisherController.publisher_create_post)
router.get('/:id/update', PublisherController.publisher_update_get)
router.post('/:id/update', PublisherController.publisher_update_post)
router.get('/:id/delete', PublisherController.publisher_delete_get)
router.post('/:id/delete', PublisherController.publisher_delete_post)
router.get('/:id', PublisherController.publisher_detail)

module.exports = router
