const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017';

// Database Name
const DB_NAME = process.env.DB_NAME || 'homework';
const COLLECTIONS = {
	USERS: 'Users',
};

// SCHEMA
const schema = require('./schema');

// MONGO CLIENT
const client = new MongoClient(MONGO_URL, { useUnifiedTopology: true });

// 
module.exports = {
	async connect() {
		const connection = await client.connect();
		console.log('Connected to MongoDB');
		const db = connection.db(DB_NAME);
		await db.createCollection(COLLECTIONS.USERS, schema)
		this.shop = db.collection(COLLECTIONS.USERS);
	},
	disconnect() {
		return client.close();
	},
};