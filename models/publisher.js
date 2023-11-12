const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PublisherSchema = new Schema({
	name: { type: String, min: [1, 'The name is too short'], required: true },
	foundation_date: { type: Date, required: true },
})

PublisherSchema.virtual('url').get(function () {
	return `/catalog/publisher/${this._id}`
})

VideogameSchema.virtual('formatted_foundation_date').get(function () {
	return DateTime.fromJSDate(this.release_date).toLocaleString(DateTime.DATE_MED)
})

module.exports = mongoose.model('Publisher', PublisherSchema)
