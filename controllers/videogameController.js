const Videogame = require('../models/videogame')
const Publisher = require('../models/publisher')
const Genre = require('../models/genre')
const { body, validationResult } = require('express-validator')

exports.index = async function (req, res, next) {
	const allVideogames = await Videogame.find({}, 'title price stock platform').sort({ title: 1 }).exec()
	res.render('catalog', { allVideogames: allVideogames })
}

exports.videogamePage = async function (req, res, next) {
	const videogameObj = await Videogame.findById(req.params.id).exec()
	res.render('videogamePage', { videogame: videogameObj })
}

exports.videogameDelete = async function (req, res, next) {
	Videogame.findOneAndDelete({ id: res.params.id })
	res.redirect('/catalog')
}

exports.videogameCreateGet = async function (req, res, next) {
	const publishers = await Publisher.find().sort({ name: 1 }).exec()
	const genre = await Genre.find().sort({ name: 1 }).exec()
	console.log(publishers, genre)

	res.render('videogameCreate', { title: 'Create videogame entry', publishers: publishers, genres: genre })
}

exports.videogameCreatePost = async function (req, res, next) {
	const newVideogame = {
		title: req.body.title,
		price: req.body.price,
		description: req.body.description,
		release_date: req.body.release_date,
		publisher: req.body.publisher,
		stock: req.body.stock,
		genre: req.body.genre,
	}
}
