const Videogame = require('../models/videogame')
const Publisher = require('../models/publisher')
const Genre = require('../models/genre')
const { body, validationResult } = require('express-validator')

exports.index = async function (req, res, next) {
	const allVideogames = await Videogame.find({}, 'title price stock platform').sort({ title: 1 }).exec()
	res.render('catalog', { allVideogames: allVideogames })
}

exports.videogame_detail = async function (req, res, next) {
	const videogameObj = await Videogame.findById(req.params.id).exec()
	res.render('videogame_detail', { videogame: videogameObj })
}

exports.videogame_create_get = async function (req, res, next) {
	const publishers = await Publisher.find().sort({ name: 1 }).exec()
	const genre = await Genre.find().sort({ name: 1 }).exec()
	console.log(publishers, genre)

	res.render('videogame_create', { title: 'Create videogame entry', publishers: publishers, genres: genre })
}

exports.videogame_create_post = [
	// Convert the genre to an array.
	(req, res, next) => {
		if (!(req.body.genre instanceof Array)) {
			if (typeof req.body.genre === 'undefined') req.body.genre = []
			else req.body.genre = new Array(req.body.genre)
		}
		if (!(req.body.publisher instanceof Array)) {
			if (typeof req.body.publisher === 'undefined') req.body.publisher = []
			else req.body.publisher = new Array(req.body.publisher)
		}
		next()
	},

	// Validate and sanitize fields.
	body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
	body('price', 'Price must be higher than 1.').trim().isLength({ min: 1 }).escape(),
	body('description', 'Description must not be empty.').trim().isLength({ min: 1 }).escape(),
	body('release_date', 'Release date must be set').trim().isLength({ min: 1 }).escape(),
	body('publisher.*').escape(),
	body('genre.*').escape(),
	body('stock', 'Stock amount must be higher than 1').trim().isLength({ min: 1 }).escape(),
	// Process request after validation and sanitization.

	async (req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req)

		// Create a Book object with escaped and trimmed data.
		const videogame = new Videogame({
			title: req.body.title,
			price: req.body.price,
			description: req.body.description,
			release_date: req.body.release_date,
			publisher: req.body.publisher,
			genre: req.body.genre,
			stock: req.body.stock,
		})

		if (!errors.isEmpty()) {
			// There are errors. Render form again with sanitized values/error messages.

			// Get all authors and genres for form.
			const [allPublishers, allGenres] = await Promise.all([Publisher.find().exec(), Genre.find().exec()])
			res.render('videogameCreate', {
				title: 'Create Videogame',
				publishers: allPublishers,
				genres: allGenres,
				videogame: videogame,
				errors: errors.array(),
			})
		} else {
			// Data from form is valid. Save book.
			await videogame.save()
			res.redirect(videogame.url)
		}
	},
]

exports.videogame_update_get = async function (req, res, next) {
	const videogameObj = await Videogame.findById(req.params.id).exec()
	const publishers = await Publisher.find().sort({ name: 1 }).exec()
	const genres = await Genre.find().sort({ name: 1 }).exec()
	res.render('videogame_update', { videogame: videogameObj, publishers: publishers, genres: genres })
}

exports.videogame_update_post = []

exports.videogame_delete_get = async function (req, res, next) {
	const id = req.params.id
	const videogameObj = await Videogame.findById(id).exec()
	res.render('videogame_delete', { videogame: videogameObj })
}

exports.videogame_delete_post = async function (req, res, next) {
	const id = req.params.id
	Videogame.findByIdAndDelete(id).exec()
	res.redirect('/catalog')
}
