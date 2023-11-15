const Publisher = require('../models/publisher')
const Videogame = require('../models/videogame')

exports.index = async function (req, res, next) {
	const publishers = await Publisher.find().sort({ name: 1 }).exec()
	res.render('publisher', { publishers: publishers })
}

exports.publisherCreateGet = async function (req, res, next) {}

exports.publisherCreatePost = async function (req, res, next) {}

exports.publisherDetail = async function (req, res, next) {
	const id = req.params.id
	const publisherObj = await Publisher.findById(id).exec()
	const gamesArr = await Videogame.find({ publisher: publisherObj._id })
	res.render('publisherDetail', { publisher: publisherObj, videogames: gamesArr, gameCount: gamesArr.length })
}
