const db = require('../models');

module.exports = {
    async getAll () {
        try {
            return await db.images.find().toArray();
        } catch (err) {
            throw new Error(`Database Error - ${err.message}`);
        }
    },
    async create(data) {
        const { ops } = await db.images.insertOne(data);
        const [newImage] = ops;
        console.log(ops);
        return newImage;
    },
    async show (idImage) {
        const image = await db.images.findOne({ id: idImage });
        if (!image) throw new Error('Non-existance');
        return image;
    },
    async updateByIdImage (idImage, data) {
        try {
            const { matchedCount } = await db.images.updateOne({
                id: idImage
            }, {
                $set: data
            });
            if (!matchedCount) throw new Error(`Image has id is ${idImage} doesn't exist`);
            return true;
        } catch (err) {
            throw new Error(`Due to ${err.message}, I cannot update it with ${JSON.stringify(data)}`);
        }
    }
}