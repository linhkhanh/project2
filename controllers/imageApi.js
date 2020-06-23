const usersRepository = require('../repositories/usersRepository');
const imagesRepository = require('../repositories/imagesRepository');
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment');

module.exports = {
    async countLove(req, res) {
        res.setHeader('Content-Type', 'application/json');
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
             if ( indexUser < 0) {
                 love.push(req.session.userName);
             } else {
                 love.splice(indexUser, 1);
             }  
         }
         images[index].love = love;
 
         // update images array in Users collection
         await usersRepository.updateByUserName(req.params.userName, { images });
 
         // update images Collection
 
         await imagesRepository.updateByIdImage(req.params.idImage, { love });
 
             return res.end(JSON.stringify(love));
    },
    async comment (req, res) {
        if (req.session.userName) {
            // Find user
            const user = await usersRepository.show(req.params.userName);

            // Find images array of this user
            const images = user.images;

            // FIND INDEX OF CURRENT IMAGE
            const index = images.findIndex((item) => {
                return item.id === req.params.idImage;
            })
            const image = images[index];
            // GET COMMENTS ARRAY OF CURRENT IMAGE
            let comments = images[index].comments;

            if (!comments) comments = []; // IF CURRENT IMAGE DOES NOT HAVE COMMENTS ARRAY, ASIGN COMMENTS TO A EMPTY ARRAY

            // GET INFOMATION OF USER COMMENT
            const userComment = await usersRepository.show(req.session.userName);

            // UPDATE COMMENTS ARRAY
            comments.push({
                id: ObjectID(),
                content: req.query.comment,
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
            return res.end(JSON.stringify( {comments, idImage: image.id} ));
        }
    }
}
