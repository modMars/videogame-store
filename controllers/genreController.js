const Genre = require('../models/genre')
const Videogame = require('../models/videogame')
const { body, validationResult } = require('express-validator')

exports.index = async function (req, res, next) {
	const genres = await Genre.find().sort({ name: 1 }).exec()
	res.render('genre', { genres: genres })
}

exports.genreCreateGet = async function (req, res, next) {
	res.render('genreCreate', { title: 'Create Genre' })
}

exports.genreCreatePost = [
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

			res.render('genreCreate', {
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

exports.genreDetail = async function (req, res, next) {
	const id = req.params.id
	const genreObj = await Genre.findById(id).exec()
	const gamesArr = await Videogame.find({ genre: genreObj._id })
	res.render('genreDetail', { genre: genreObj, videogames: gamesArr, gameCount: gamesArr.length })
}
