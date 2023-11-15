#! /usr/bin/env node

console.log(
	'This script populates some test videogames, publishers and genres the db. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
)

// Get arguments passed on command line
const userArgs = process.argv.slice(2)
console.log(userArgs)
const Videogame = require('./models/videogame')
const Publisher = require('./models/publisher')
const Genre = require('./models/genre')

const genres = []
const publishers = []
const videogames = []

const mongoose = require('mongoose')
mongoose.set('strictQuery', false) // Prepare for Mongoose 7

const mongoDB = userArgs[0]

main().catch(err => console.log(err))

async function main() {
	console.log('Debug: About to connect')
	await mongoose.connect(mongoDB)
	mongoose.connection.db.dropCollection('videogames', function (err, result) {
		if (err) {
			console.log(err)
		} else console.log(result)
	})
	mongoose.connection.db.dropCollection('publishers', function (err, result) {
		if (err) {
			console.log(err)
		} else console.log(result)
	})
	mongoose.connection.db.dropCollection('genres', function (err, result) {
		if (err) {
			console.log(err)
		} else console.log(result)
	})
	console.log('Debug: Should be connected?')
	await createGenres()
	await createPublishers()
	await createVideogames()
	console.log('Debug: Closing mongoose')
	mongoose.connection.close()
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function genreCreate(index, name, description) {
	const genre = new Genre({ name: name, description: description })
	await genre.save()
	genres[index] = genre
	console.log(`Added genre: ${name}`)
}

async function publisherCreate(index, name, foundation_date) {
	const publisherDetail = { name: name, foundation_date: foundation_date }
	if (foundation_date != false) publisherDetail.foundation_date = foundation_date

	const publisher = new Publisher(publisherDetail)

	await publisher.save()
	publishers[index] = publisher
	console.log(`Added publisher: ${name} ${foundation_date}`)
}

async function videogameCreate(index, title, price, description, release_date, publisher, genre, stock, platform) {
	const videogameDetail = {
		title: title,
		price: price,
		description: description,
		release_date: release_date,
		publisher: publisher,
		stock: stock,
	}
	if (genre && genre !== false) videogameDetail.genre = genre
	if (platform && platform !== false) videogameDetail.platform = platform

	const videogame = new Videogame(videogameDetail)
	await videogame.save()
	videogames[index] = videogame
	console.log(`Added videogame: ${title}`)
}

async function createGenres() {
	console.log('Adding genres')
	await Promise.all([
		genreCreate(
			0,
			'Action',
			'Action games focus on physical challenges, hand-eye coordination, and reaction time. They often involve combat, exploration, and various challenges that require quick reflexes and skill.'
		),
		genreCreate(
			1,
			'Adventure',
			'Adventure games emphasize story-driven experiences where players often assume the role of a character in a narrative-rich environment. These games typically involve exploration, puzzle-solving, and interaction with characters to progress through the story.'
		),
		genreCreate(
			2,
			'Shooter',
			'Shooter games revolve around combat where players use firearms or other ranged weapons to eliminate enemies. The gameplay usually involves precise aiming and shooting skills, and these games can be first-person (FPS) or third-person (TPS) shooters.'
		),
		genreCreate(
			3,
			'Platformer',
			'Platformer games focus on navigating characters through levels by jumping between platforms. They often involve overcoming obstacles, avoiding hazards, and timing jumps to progress. Classic examples include Super Mario Bros.'
		),
		genreCreate(
			4,
			'RPG',
			'RPGs involve players taking on the roles of characters in a fictional world. These games often feature character development, storytelling, and decision-making. Players typically engage in quests, explore worlds, and gain experience points to improve their characters.'
		),
		genreCreate(
			5,
			'Racing',
			'Racing games center around competitive driving or racing scenarios. Players can compete against computer-controlled opponents or other players, aiming to finish first in a race. These games often include a variety of vehicles and race tracks.'
		),
		genreCreate(
			6,
			'Horror',
			'Horror games are designed to evoke fear and suspense in players. They often feature dark and eerie atmospheres, supernatural elements, or psychological horror. The gameplay may involve solving puzzles, surviving threats, or uncovering a mysterious storyline.'
		),
	])
}

async function createPublishers() {
	console.log('Adding publishers')
	await Promise.all([
		publisherCreate(0, 'Rockstar Games', new Date(1998, 11, 1)),
		publisherCreate(1, 'Bethesda Studios', new Date(1986, 5, 28)),
		publisherCreate(2, 'Capcom', new Date(1979, 4, 30)),
		publisherCreate(3, 'Santa Monica Studio', new Date(1999, 0, 1)),
		publisherCreate(4, 'Sony', new Date(1946, 4, 7)),
	])
}

async function createVideogames() {
	console.log('Adding Videogames')
	await Promise.all([
		videogameCreate(
			0,
			'Grand Theft Auto V',
			60,
			`Grand Theft Auto V (GTA V) is an action-packed open-world video game set in the fictional state of San Andreas. Players follow the intertwining stories of three protagonists—Michael, a retired bank robber; Franklin, an ambitious gang member; and Trevor, a violent criminal. Together, they navigate a world of heists, government intrigue, and betrayals, all within the vast and detailed landscape of Los Santos. Released in 2013, GTA V received acclaim for its compelling narrative, dynamic characters, and expansive gameplay.`,
			new Date(2013, 8, 17),
			publishers[0],
			[genres[0], genres[1], genres[2]],
			854,
			['PlayStation 5', 'PlayStation 4', 'Xbox One', 'PlayStation 3', 'Xbox 360', 'Xbox Series X/S', 'PC']
		),
		videogameCreate(
			1,
			'Red Dead Redemption 2',
			60,
			`Red Dead Redemption 2 (RDR2) is an epic western-themed action-adventure game developed by Rockstar Games. Set in 1899, the game follows Arthur Morgan, an outlaw and a member of the Van der Linde gang, as they navigate the decline of the Wild West. The gang is on the run from law enforcement and rival gangs, facing internal struggles and external threats. Players explore a vast and immersive open world, engaging in intense shootouts, hunting, and decision-making that shapes the story. RDR2 is praised for its rich narrative, realistic depiction of the American frontier, and the depth of its characters. Released in 2018, it stands as a masterpiece in modern gaming.`,
			new Date(2018, 9, 26),
			publishers[0],
			[genres[0], genres[1], genres[2]],
			1327,
			['PlayStation 4', 'Xbox One', 'Google Stadia', 'PC']
		),
		videogameCreate(
			2,
			'The Elder Scrolls V',
			45,
			`The Elder Scrolls V: Skyrim is a critically acclaimed open-world RPG set in the province of Skyrim. Released in 2011, players take on the role of the Dragonborn, a hero destined to defeat dragons and the ancient threat of Alduin. The game features a vast, immersive world with a rich narrative, diverse quests, and opportunities for character customization. Known for its modding community, Skyrim stands out for its deep lore and player freedom.`,
			new Date(2011, 10, 11),
			publishers[1],
			[genres[0], genres[1], genres[4]],
			343,
			[
				'PlayStation 5',
				'PlayStation 4',
				'PlayStation 3',
				'Xbox Series X/S',
				'Xbox One',
				'Xbox 360',
				'Nintendo Switch',
				'PC',
			]
		),
		videogameCreate(
			3,
			'Resident Evil 4',
			60,
			`Resident Evil 4, released in 2005, follows government agent Leon S. Kennedy as he rescues the President's daughter from a cult in rural Europe. Facing infected villagers and a bio-organic weapons plot, Leon navigates intense encounters and puzzles, revolutionizing the survival horror genre with its innovative gameplay and gripping narrative.`,
			new Date(2023, 2, 23),
			publishers[2],
			[genres[0], genres[1], genres[2], genres[6]],
			1454,
			['PlayStation 5', 'PlayStation 4', 'Xbox Series X/S', 'MacOS', 'PC']
		),
		videogameCreate(
			4,
			'God of War',
			60,
			`In God of War (2018), Kratos, the former Greek god, and his son, Atreus, journey through Norse mythology to fulfill a poignant final wish. Exploring themes of fatherhood and redemption, the game intricately weaves a narrative filled with gods, monsters, and the consequences of Kratos' tumultuous past. The visually stunning adventure received widespread acclaim for its compelling storytelling and dynamic gameplay.`,
			new Date(2018, 3, 20),
			publishers[3],
			[genres[0], genres[1]],
			2594,
			['PlayStation 4', 'PC']
		),
		videogameCreate(
			5,
			'Spider-Man',
			60,
			`Developed by Insomniac Games, this Spider-Man adventure invites players into the vibrant world of Peter Parker's dual life. Navigating the intricacies of daily existence alongside the exhilarating challenges of being a web-swinging hero, players traverse a meticulously crafted New York City. As the narrative unfolds, iconic villains and classic adversaries add depth to an engaging story, making this game a celebrated entry in the Spider-Man legacy.`,
			new Date(2018, 8, 7),
			publishers[4],
			[genres[0], genres[1]],
			2251,
			['PlayStation 4', 'PC']
		),
		videogameCreate(
			6,
			'Test videogame 1',
			60,
			'This is a description 1',
			new Date(2012, 11, 18),
			publishers[2],
			[genres[0], genres[4], genres[6]],
			5099,
			['PlayStation 4', 'PC', 'MacOS', 'Xbox One']
		),
		videogameCreate(
			7,
			'Test videogame 2',
			99,
			'This is a description 2',
			new Date(2010, 8, 1),
			publishers[1],
			false,
			43333,
			false
		),
	])
}
