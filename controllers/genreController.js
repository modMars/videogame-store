const genre = require('../models/genre')
const Genre = require('../models/genre')
const Videogame = require('../models/videogame')

exports.index = async function (req, res, next) {
	const genres = await Genre.find().sort({ name: 1 }).exec()
	res.render('genre', { genres: genres })
}

exports.genreCreateGet = async function (req, res, next) {}

exports.genreCreatePost = async function (req, res, next) {}

exports.genreDetail = async function (req, res, next) {
	const id = req.params.id
	const genreObj = await Genre.findById(id).exec()
	const gamesArr = await Videogame.find({ genre: genreObj._id })
	res.render('genreDetail', { genre: genreObj, videogames: gamesArr, gameCount: gamesArr.length })
}
