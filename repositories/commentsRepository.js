module.exports = {
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
}