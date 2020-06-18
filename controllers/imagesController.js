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
            const currentUser = req.session.userName; // GET CURRENT USER 
            const user = await usersRepository.show(req.params.userName); //FIND USER
            // FIND IMAGE
            const image = user.images.find((item) => {
                return item.id === req.params.idImage
            });

            // FORMAT DATE
            image.createdAt = moment(image.createdAt).format('MMMM Do YYYY, h:mm:ss a');

            // SHOW ALL COMMENTS OF IMAGE
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

        // UPDATE COMMENTS ARRAY
        comments.push({
            id: ObjectID(),
            content: req.body.comment,
            createdAt: new Date,
            userComment: req.session.userName
        })
        images[index].comments = comments;
        await usersRepository.updateByUserName(req.params.userName, {
            images
        })

        // UPDATE IMAGES COLLECTION

        await imagesRepository.updateByIdImage(images[index].id, { comments });
        res.redirect(`/lico/${req.params.userName}/${req.params.idImage}`)
    },
    async getAllImage (req, res) {
        try {
            if (req.session.userName) {
                const images = await imagesRepository.getAll();

                // get userName of User login
                const name = req.session.userName;

                return res.render('index', { images, name });
            } else {
                return res.redirect('/lico/login');
            }
        } catch (err) {
            return res.send(err.message);
        }
        
    }
}