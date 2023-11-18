const Publisher = require('../models/publisher')
const Videogame = require('../models/videogame')
const { body, validationResult } = require('express-validator')

exports.index = async function (req, res, next) {
	const publishers = await Publisher.find().sort({ name: 1 }).exec()
	res.render('publisher', { publishers: publishers })
}

exports.publisherCreateGet = async function (req, res, next) {
	res.render('publisherCreate')
}

exports.publisherCreatePost = [
	// Validate and sanitize fields.
	body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
	body('foundation_date', 'Foundation date shouldnt be empty.').trim().isLength({ min: 1 }).escape(),
	// Process request after validation and sanitization.

	async (req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req)

		// Create a Book object with escaped and trimmed data.
		const publisher = new Publisher({
			name: req.body.name,
			foundation_date: req.body.foundation_date,
		})

		if (!errors.isEmpty()) {
			// There are errors. Render form again with sanitized values/error messages.

			res.render('publisherCreate', {
				publisher: publisher,
				errors: errors.array(),
			})
		} else {
			// Data from form is valid. Save book.
			await publisher.save()
			res.redirect(publisher.url)
		}
	},
]

exports.publisherDetail = async function (req, res, next) {
	const id = req.params.id
	const publisherObj = await Publisher.findById(id).exec()
	const gamesArr = await Videogame.find({ publisher: publisherObj._id })
	res.render('publisherDetail', { publisher: publisherObj, videogames: gamesArr, gameCount: gamesArr.length })
}

exports.publisherDeleteGet = async function (req, res, next) {
	const id = req.params.id
	const publisherObj = await Publisher.findById(id).exec()
	const videogameCount = await Videogame.countDocuments({ publisher: publisherObj })
	res.render('publisherDelete', { game_count: videogameCount, publisher: publisherObj })
}

exports.publisherDeletePost = async function (req, res, next) {
	const id = req.params.id
	await Publisher.findByIdAndDelete(id).exec()
	res.redirect(`/publisher`)
}
