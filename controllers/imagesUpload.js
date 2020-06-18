const usersRepository = require('../repositories/usersRepository');
const imagesRepository = require('../repositories/imagesRepository');
const cloudinary = require('cloudinary').v2;
const moment = require('moment');
const ObjectID = require('mongodb').ObjectID;

module.exports = {
    async uploadAvata(req, res, next) {
        try {
            /// CLOUDINARY
            await cloudinary.uploader.upload(req.file.path,
                async function (error, result) {
                   
                    await usersRepository.updateByUserName(req.params.userName, { avata: result.url });
                }
            )
            
            return res.redirect(`/lico/${req.session.userName}`);
        } catch (err) {
            console.log(err);
        }

    },
    async uploadImage(req, res, next) {
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
                    await imagesRepository.create({
                        id: result.public_id,
                        url: result.url,
                        createdAt: result.created_at,
                        description: req.body.description,
                        userName: user.userName
                    })
                }
            )
            
            return res.redirect(`/lico/${req.session.userName}`);
        } catch (err) {
            console.log(err);
        }
    },
    async showImage(req, res) {
        if (req.session.userName) {
            const currentUser = req.session.userName;
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

            res.render('image', { image, user, currentUser });
        } else {
            res.redirect('/lico/login');
        }

    },
    async commentImage(req, res) {
        // Find user
        const user = await usersRepository.show(req.params.userName);
        
        // Find images array of this user
        const images = user.images;
        
        // FIND INDEX OF CURRENT IMAGE
        const index = images.findIndex((item) => {
            return item.id === req.params.idImage;
        })

        // GET COMMENTS ARRAY OF CURRENT IMAGE
        let comments = images[index].comments;

        if (!comments) comments = []; // IF CURRENT IMAGE DOES NOT HAVE COMMENTS ARRAY, ASIGN COMMENTS TO A EMPTY ARRAY

        // GET INFOMATION OF USER COMMENT
        const userComment = await usersRepository.show(req.session.userName);

        comments.push({
            id: ObjectID(),
            content: req.body.comment,
            createdAt: new Date,
            userComment: req.session.userName,
            avataOfUserComment: userComment.avata
        })
        images[index].comments = comments;
        await usersRepository.updateByUserName(req.params.userName, {
            images
        })
        res.redirect(`/lico/${req.params.userName}/${req.params.idImage}`)
    }
}