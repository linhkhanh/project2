const db = require('../models');

module.exports = {
    async getAll () {
        try {
            return await db.users.find().toArray();
        } catch (err) {
            throw new Error(`Database Error - ${err.message}`);
        }
    },
    async show (name) {
        const item = await db.Users.findOne({ name: { '$regex': `^${name}$`, '$options': 'i' } });
        if (!item) throw new Error('Non-existance');
        return item;
    },
    async create(data) {
        const { ops } = await db.Users.insertOne(data);
        const [newUser] = ops;
        console.log(ops);
        return newUser;
    },
    async getOneByName (name) {
        const foundItem = await db.Users.findOne(
            {
                name: {
                    '$regex': `^${name}$`,
                    '$options': 'i'
                }
            }
        );
        if (!foundItem) throw new Error(`Item with name '${name}' does not exist`);
        return foundItem;
    },
    async updateByName (name, item) {
        try {
            const { matchedCount } = await db.Users.updateOne({
                name: {
                    '$regex': `^${name}$`,
                    '$options': 'i'
                }
            }, {
                $set: item
            });
            if (!matchedCount) throw new Error(`${name} doesn't exist`);
            return true;
        } catch (err) {
            throw new Error(`Due to ${err.message}, I cannot update it with ${JSON.stringify(item)}`);
        }
    }
};