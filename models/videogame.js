const mongoose = require('mongoose')
const { DateTime } = require('luxon')

const Schema = mongoose.Schema

const VideogameSchema = new Schema({
	title: { type: String, required: true },
	price: { type: Number, min: [1, 'Price must 1 or higher'], required: true },
	description: { type: String, required: true },
	release_date: { type: Date, required: true },
	publisher: { type: Schema.Types.ObjectId, ref: 'Publisher', required: true },
	genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
	stock: { type: Number, required: true },
	platform: [{ type: String }],
	cover: { type: String },
})

VideogameSchema.virtual('url').get(function () {
	return `/catalog/game/${this._id}`
})

VideogameSchema.virtual('formatted_release_date').get(function () {
	return DateTime.fromJSDate(this.release_date).toLocaleString(DateTime.DATE_MED)
})

module.exports = mongoose.model('VideoGame', VideogameSchema)
