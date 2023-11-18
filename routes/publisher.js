const express = require('express')
const router = express.Router()
const PublisherController = require('../controllers/publisherController')

/* GET users listing. */
router.get('/', PublisherController.index)
router.get('/create', PublisherController.publisherCreateGet)
router.post('/create', PublisherController.publisherCreatePost)
router.get('/:id/delete', PublisherController.publisherDeleteGet)
router.post('/:id/delete', PublisherController.publisherDeletePost)
router.get('/:id', PublisherController.publisherDetail)

module.exports = router
