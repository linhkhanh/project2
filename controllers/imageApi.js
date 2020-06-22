const usersRepository = require('../repositories/usersRepository');
const imagesRepository = require('../repositories/imagesRepository');
const moment = require('moment');

module.exports = {
    // async show (req, res) {
    //     res.setHeader('Content-Type', 'application/json');
        
    //     if (req.session.userName) {
    //         const user = await usersRepository.show(req.params.userName);
    //         const image = user.images.find((item) => {
    //             return item.id === req.params.idImage
    //         });
    //         image.createdAt = moment(image.createdAt).format('MMMM Do YYYY, h:mm:ss a');
    //         if (image.comments) {
    //             image.comments.forEach((item) => {
    //                 return item.createdAt = moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a');
    //             })
    //         }

    //         res.end(JSON.stringify(image));
    //     } else {
    //         res.end(JSON.stringify({ error: "Image is not found." }));
    //     }
    // },
    async countLove(req, res) {
        res.setHeader('Content-Type', 'application/json');
         // FIND IMAGE IN USERS COLLECTION

         const user = await usersRepository.show(req.params.userName);
         const images = user.images;
         const index = images.findIndex(item => {
             return item.id === req.params.idImage;
         });
 
         // COUNT LOVE
         // checnk love array in curent image object
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
       
    }
}
