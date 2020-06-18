const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017';

// Database Name
const DB_NAME = process.env.DB_NAME || 'project2';
const COLLECTIONS = {
	USERS: 'Users',
	IMAGES: "images"
};

// SCHEMA
const schemaUser = require('./schemaUser');
const schemaImage = require('./schemaImage');
// MONGO CLIENT
const client = new MongoClient(MONGO_URL, { useUnifiedTopology: true });

// 
module.exports = {
	async connect() {
		const connection = await client.connect();
		console.log('Connected to MongoDB');
		const db = connection.db(DB_NAME);
		await db.createCollection(COLLECTIONS.USERS, schemaUser);
		await db.createCollection(COLLECTIONS.IMAGES, schemaImage);

		db.collection(COLLECTIONS.USERS).createIndex({"userName": 1}, {unique: true});
		db.collection(COLLECTIONS.USERS).createIndex({"email": 1}, {unique: true});
		this.Users = db.collection(COLLECTIONS.USERS);
		this.images = db.collection(COLLECTIONS.IMAGES)
	},
	disconnect() {
		return client.close();
	},
};