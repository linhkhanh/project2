const usersRepository = require('../repositories/usersRepository');
const moment = require('moment');

module.exports = {
    async show (req, res) {
        res.setHeader('Content-Type', 'application/json');
        
        if (req.session.userName) {
            const user = await usersRepository.show(req.params.userName);
            const image = user.images.find((item) => {
                return item.id === req.params.idImage
            });
            image.createdAt = moment(image.createdAt).format('MMMM Do YYYY, h:mm:ss a');
            if (image.comments) {
                image.comments.forEach((item) => {
                    return item.createdAt = moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a');
                })
            }

            res.end(JSON.stringify(image));
        } else {
            res.end(JSON.stringify({ error: "Image is not found." }));
        }
    }
}
