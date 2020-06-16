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
    async create(data) {
        const { ops } = await db.Users.insertOne(data);
        const [newUser] = ops;
        console.log(ops);
        return newUser;
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