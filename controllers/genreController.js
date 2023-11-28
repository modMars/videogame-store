const Genre = require('../models/genre')
const Videogame = require('../models/videogame')
const { body, validationResult } = require('express-validator')

exports.index = async function (req, res, next) {
	const genres = await Genre.find().sort({ name: 1 }).exec()
	res.render('genre', { genres: genres })
}

exports.genre_detail = async function (req, res, next) {
	const id = req.params.id
	const genreObj = await Genre.findById(id).exec()
	const gamesArr = await Videogame.find({ genre: genreObj._id })
	res.render('genre_detail', { genre: genreObj, videogames: gamesArr, gameCount: gamesArr.length })
}

exports.genre_create_get = async function (req, res, next) {
	res.render('genre_create', { title: 'Create Genre', update: false })
}

exports.genre_create_post = [
	// Validate and sanitize fields.
	body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
	body('description', 'Description must not be empty.').trim().isLength({ min: 1 }).escape(),
	// Process request after validation and sanitization.

	async (req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req)

		// Create a Book object with escaped and trimmed data.
		const genre = new Genre({
			name: req.body.name,
			description: req.body.description,
		})

		if (!errors.isEmpty()) {
			// There are errors. Render form again with sanitized values/error messages.

			res.render('genre_create', {
				title: 'Create Genre',
				genre: genre,
				errors: errors.array(),
			})
		} else {
			// Data from form is valid. Save book.
			await genre.save()
			res.redirect(genre.url)
		}
	},
]

exports.genre_update_get = async function (req, res, next) {
	const id = req.params.id
	const genreObj = await Genre.findById(id).exec()
	res.render('genre_create', { title: 'Genre update', genre: genreObj, update: true })
}

exports.genre_update_post = [
	// Validate and sanitize fields.
	body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
	body('description', 'Description must not be empty.').trim().isLength({ min: 1 }).escape(),
	// Process request after validation and sanitization.

	async (req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req)

		// Create a Book object with escaped and trimmed data.
		const genre = new Genre({
			_id: req.params.id,
			name: req.body.name,
			description: req.body.description,
		})

		if (!errors.isEmpty()) {
			// There are errors. Render form again with sanitized values/error messages.

			res.render('genre_create', {
				title: 'Create Genre',
				genre: genre,
				errors: errors.array(),
				update: true,
			})
		} else {
			// Data from form is valid. Save book.
			const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, genre, {})
			res.redirect(updatedGenre.url)
		}
	},
]

exports.genre_delete_get = async function (req, res, next) {
	const id = req.params.id
	const genreObj = await Genre.findById(id).exec()
	const videogameCount = await Videogame.countDocuments({ genre: genreObj })
	res.render('genre_delete', { genre: genreObj, game_count: videogameCount })
}

exports.genre_delete_post = async function (req, res, next) {
	const id = req.params.id
	Genre.findByIdAndDelete(id).exec()
	res.redirect('/genre')
}
