const db = require('../models');

module.exports = {
    async getAll () {
        try {
            return await db.Users.find().toArray();
        } catch (err) {
            throw new Error(`Database Error - ${err.message}`);
        }
    },
    async show (name) {
        const user = await db.Users.findOne({ userName: name });
        if (!user) throw new Error('Non-existance');
        return user;
    },
    async create (user) {
        try {
            const { insertedCount } = await db.Users.insertOne(user);
            if (!insertedCount) throw new Error('insertion failure');
            return true;
        } catch (err) {
            throw new Error(`Due to ${err.message}, you are not allowed to insert this user ${JSON.stringify(user)}`);
        }
    },
    async getOneByEmail (email) {
        const foundUser = await db.Users.findOne(
            {
                email: email
            }
        );
        if (!foundUser) throw new Error(`User with email '${email}' does not exist`);
        return foundUser;
    },
    async updateByUserName (userName, data) {
        try {
            const { matchedCount } = await db.Users.updateOne({
                userName: userName
            }, {
                $set: data
            });
            if (!matchedCount) throw new Error(`${userName} doesn't exist`);
            return true;
        } catch (err) {
            throw new Error(`Due to ${err.message}, I cannot update it with ${JSON.stringify(data)}`);
        }
    }
};