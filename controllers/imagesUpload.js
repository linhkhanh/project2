const usersRepository = require('../repositories/usersRepository');
const cloudinary = require('cloudinary').v2;

module.exports = {
    async uploadAvata (req, res, next) {
        try {
            /// CLOUDINARY
            await cloudinary.uploader.upload(req.file.path,
                async function (error, result) {
                    await usersRepository.updateByUserName(req.params.userName, { avata: result.url });
                }
            )
            res.redirect(`/lico/${req.session.userName}`);
        } catch (err) {
            console.log(err);
        }
       
    },
    async uploadImage  (req, res, next) {
        try {
            const user = await usersRepository.show(req.params.userName);
            /// CLOUDINARY
            await cloudinary.uploader.upload(req.file.path,
                async function (error, result) {
                    let images = user.images;
                    if (!images) images = [];
                    images.push({
                        id: result.public_id,
                        url: result.url,
                        createdAt: result.created_at,
                        description: req.body.description
                    })
                    await usersRepository.updateByUserName(req.params.userName, { images: images });
                }
            )
            res.redirect(`/lico/${req.session.userName}`);
        } catch (err) {
            console.log(err);
        }
    },
    async showImage (req, res) {

    }
}