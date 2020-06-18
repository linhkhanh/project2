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
        return image;
    },
}