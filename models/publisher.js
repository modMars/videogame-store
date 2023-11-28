const mongoose = require('mongoose')
const { DateTime } = require('luxon')
const Schema = mongoose.Schema

const PublisherSchema = new Schema({
	name: { type: String, min: [1, 'The name is too short'], required: true },
	foundation_date: { type: Date, required: true },
})

PublisherSchema.virtual('url').get(function () {
	return `/publisher/${this._id}`
})

PublisherSchema.virtual('formatted_foundation_date').get(function () {
	return DateTime.fromJSDate(this.foundation_date).toLocaleString(DateTime.DATE_MED)
})

PublisherSchema.virtual('foundation_date_for_form').get(function () {
	return DateTime.fromJSDate(this.foundation_date).toFormat('yyyy-MM-dd')
})

module.exports = mongoose.model('Publisher', PublisherSchema)
