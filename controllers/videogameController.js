const Videogame = require('../models/videogame')

exports.index = async function (req, res, next) {
	const allVideogames = await Videogame.find({}, 'title price stock platform').sort({ title: 1 }).exec()
	res.render('catalog', { allVideogames: allVideogames })
}

exports.videogamePage = async function (req, res, next) {
	const videogameObj = await Videogame.findById(req.params.id).exec()
	res.render('videogamePage', { videogame: videogameObj })
}
