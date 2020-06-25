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
            // FIND USER
            const user = await usersRepository.show(req.params.userName);
            /// CLOUDINARY
            await cloudinary.uploader.upload(req.file.path,
                async function (error, result) {

                    // GET IMAGES ARRAY OF USER
                    let images = user.images;
                    if (!images) images = []; // CHECK THERE IS IMAGES ARRAY OR NOT

                    // ADD NEW IMAGE TO IMAGES ARRAY OF USER
                    images.push({
                        id: result.public_id,
                        url: result.url,
                        createdAt: new Date(result.created_at),
                        description: req.body.description
                    });

                    // CREATE NEW IMAGE IN COLLECTION IMAGE
                    const data = {
                        id: result.public_id,
                        url: result.url,
                        createdAt: new Date(result.created_at),
                        description: req.body.description,
                        userName: user.userName,
                        avataUser: user.avata
                    }
                    await usersRepository.updateByUserName(req.params.userName, { images: images });
                    await imagesRepository.create(data);
                }
            )

            return res.redirect(`/lico/${req.session.userName}`);
        } catch (err) {
            console.log(err);
        }
    },
    async showImage(req, res) {
        if (req.session.userName) {
            // get ALL users for search engine
            const users = await usersRepository.getAll();

            const name = req.session.userName; // GET CURRENT USER 
            const currentUser = await usersRepository.show(name);

            const user = await usersRepository.show(req.params.userName); //FIND USER
            // FIND IMAGE
            const image = user.images.find((item) => {
                return item.id === req.params.idImage
            });

            res.render('image', { image, user, name, users, moment, currentUser });
        } else {
            res.redirect('/lico/login');
        }

    },
    async commentImage(req, res) {
        if (req.session.userName) {
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

            // UPDATE COMMENTS ARRAY
            comments.push({
                id: ObjectID(),
                content: req.body.comment,
                createdAt: new Date,
                userComment: req.session.userName,
                avataOfUserComment: userComment.avata
            })
            // update COMMENTS ARRAY OF CURRENT IMAGE IN USER COLLECTION
            images[index].comments = comments;
            await usersRepository.updateByUserName(req.params.userName, {
                images
            })

            // UPDATE IMAGES COLLECTION

            await imagesRepository.updateByIdImage(images[index].id, { comments });

            // update NOTIFICATION OF CURRENT USER
            let notification = user.notification;

            // CHECK IS THERE NOTIFICATION OBJECT OR NOT
            if (!notification) notification = {
                comments: []
            };

            // IF THERE IS NOTIFICATION OBJECT, CHECK NOTIFICATION.COMMENTS EXISTS OR NOT
            if (!notification.comments) notification.comments = [];

            notification.comments.push({
                userComment: req.session.userName,
                idImage: req.params.idImage,
                avataOfUserComment: userComment.avata
            });
            await usersRepository.updateByUserName(req.params.userName, { notification })

            res.redirect(`/lico/${req.params.userName}/${req.params.idImage}`)
        }

    },
    async getAllImage(req, res) {
        try {
            if (req.session.userName) {
                const images = await imagesRepository.getAll();
                images.reverse();

                // get all Users
                const users = await usersRepository.getAll();
                users.reverse();
                // get userName of User login
                const name = req.session.userName;
                // get currentUser
                const currentUser = await usersRepository.show(name);

                return res.render('index', { images, name, users, moment, currentUser });
            } else {
                return res.redirect('/lico/login');
            }
        } catch (err) {
            return res.send(err.message);
        }
    },
    async updateDescription(req, res) {
        try {
            // Find IMAGES ARRAYS OF USER
            const user = await usersRepository.show(req.params.userName);
            const images = user.images;

            // FIND INDEX OF CURRENT IMAGE IN IMAGES ARRAY

            const index = images.findIndex(item => {
                return item.id === req.params.idImage
            });

            // update DESCRIPTION OF CURRENT IMAGE
            images[index].description = req.body.description;
            images[index].updatedAt = new Date();

            // UPDATE IMAGES ARRAY

            await usersRepository.updateByUserName(req.params.userName, { images });

            // update IMAGES COLLECTION

            await imagesRepository.updateByIdImage(req.params.idImage, {
                description: req.body.description,
                updatedAt: new Date()
            });

            return res.redirect(`/lico/${req.params.userName}/${req.params.idImage}`)

        } catch (err) {
            console.log(err.message);
        }
    },
    async deleteImage(req, res) {
        try {
            // delete current Image from IMAGES COLLECTION
            await imagesRepository.delete({ id: req.params.idImage });

            // DELETE IMAGE FROM IMAGES ARRAY OF USER
            const user = await usersRepository.show(req.params.userName);
            const images = user.images;
            const index = images.findIndex(item => {
                return item.id === req.params.idImage;
            });

            images.splice(index, 1);

            // UPDATE IMAGES ARRAY OF USER

            await usersRepository.updateByUserName(req.params.userName, { images })

            return res.redirect(`/lico/${user.userName}`);
        } catch (err) {
            console.log(err)
        }
    },
    async countLove(req, res) {
        // FIND IMAGE IN USERS COLLECTION

        const user = await usersRepository.show(req.params.userName);
        const images = user.images;
        const index = images.findIndex(item => {
            return item.id === req.params.idImage;
        });

        // COUNT LOVE
        // check love array in curent image object
        let love = images[index].love;
        if (!love) {
            love = [];
            love.push(req.session.userName);
        } else {
            const indexUser = love.findIndex(item => {
                return item === req.session.userName
            });
            // if this user already loved this image => unlove, remove this user from love array
            if (indexUser < 0) {
                love.push(req.session.userName);
            } else {
                love.splice(indexUser, 1);
            }

        }
        images[index].love = love; // update images array

        // update images array in Users collection
        await usersRepository.updateByUserName(req.params.userName, { images });

        // update images Collection

        await imagesRepository.updateByIdImage(req.params.idImage, { love });

        // UPDATE NOTIFICATION OF CURRENT USER
        let notification = user.notification;

        // CHECK IS THERE NOTIFICATION OBJECT OR NOT
        if (!notification) notification = {
            love: []
        };

        // IF THERE IS NOTIFICATION OBJECT, CHECK NOTIFICATION.LOVE EXISTS OR NOT
        if (!notification.love) notification.love = [];

        // get User loves image
        const userLoveImage = await usersRepository.show(req.session.userName);

        notification.love.push({
            userLoveImage: req.session.userName,
            idImage: req.params.idImage,
            avataOfUserLoveImage: userLoveImage.avata
        });

        await usersRepository.updateByUserName(req.params.userName, { notification })

        return res.redirect(`/lico/${req.params.userName}/${req.params.idImage}`);
    },
    async deleteComment(req, res) {
        // FIND USER
        const user = await usersRepository.show(req.params.userName);

        // FIND CURRENT IMAGE
        const images = user.images;
        const index = images.findIndex((item) => {
            return item.id === req.params.idImage;
        });

        // FIND INDEX OF COMMENT
        const indexComment = images[index].comments.findIndex(item => {
            return item.id === req.params.idComment;
        });

        // delete current comment from comments array
        const comments = images[index].comments.splice(indexComment, 1);

        // update comments array of current image in USERS COLLECTION

        await usersRepository.updateByUserName(req.params.userName, { images });

        // UPDATE COMMENTS ARRAY IN IMAGES COLLECTION

        await imagesRepository.updateByIdImage(req.params.idImage, { comments });

        return res.redirect(`/lico/${user.userName}/${req.params.idImage}`);
    },
    async editComment(req, res) {
        // FIND USER
        const user = await usersRepository.show(req.params.userName);

        // FIND CURRENT IMAGE
        const images = user.images;
        const index = images.findIndex((item) => {
            return item.id === req.params.idImage;
        });

        // FIND INDEX OF COMMENT
        const indexComment = images[index].comments.findIndex(item => {
            return item.id == req.params.idComment;
        });

        // update CONTENT OF CURRENT COMMENT

        images[index].comments[indexComment].content = req.body.comment;
        images[index].comments[indexComment].updatedAt = new Date;

        // UPDATE IN USERS COLLECTION

        await usersRepository.updateByUserName(req.params.userName, { images });

        // UPDATE IN IMAGES COLLECTION

        const comments = images[index].comments;
        await imagesRepository.updateByIdImage(req.params.idImage, { comments });
        return res.redirect(`/lico/${user.userName}/${req.params.idImage}`);
    }
}