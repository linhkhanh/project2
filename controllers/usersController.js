const usersRepository = require('../repositories/usersRepository');
const imagesRepository = require('../repositories/imagesRepository');
const moment = require('moment');
const bcrypt = require('bcrypt');
module.exports = {
   
    async getAll(req, res) {
        try {
            if (req.session.userName) {
                const users = await usersRepository.getAll();

                // get userName of User login
                const name = req.session.userName;

                // find index of this user in data 
                const index = users.findIndex((user) => {
                    return user.userName === name;
                });

                // change list of users to make it just display the other users
                users.splice(index, 1);
                return res.render('home', { users, name });
            } else {
                return res.redirect('/lico/login');
            }
        } catch (err) {
            return res.send(err.message);
        }
    },
    async show(req, res) {
        try {
            if (req.session.userName) {
                req.session.avata = false;
                req.session.image = false;

                const users = await usersRepository.getAll()
                const user = await usersRepository.show(req.params.userName);

                // format date
                user.createdAt = moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a');

                return res.render('show', { user, name: req.session.userName, users  });
            } else {
                res.redirect('/lico/login');
            }

        } catch (err) {
            return res.send(err.message);
        }
    }
    ,
    async edit(req, res) {
        if (req.params.userName === req.session.userName) {
            // Get all users for search engine
            const users = await usersRepository.getAll();

            const user = await usersRepository.show(req.params.userName);
            res.render('edit', { user, users, name: req.session.userName });
        } else {
            res.redirect('/lico/login');
        }
    },
    async update(req, res) {
        try {
            
            const user = {
                'userName': req.params.userName,
                'email': req.body.email,
                'biography': req.body.biography,
                'birthDay': req.body.birthDay,
                'location': req.body.location
            };
            if(req.body.newPassword) {
                const hashedString = bcrypt.hashSync(req.body.newPassword, bcrypt.genSaltSync(10));
                user.password = hashedString;
            }
            req.session.userName = req.body.userName;
            
            // update user information
            await usersRepository.updateByUserName(req.params.userName, user);
            return res.redirect(`/lico/${user.userName}`);
        } catch (err) {
            console.log(err);
            return res.send(err.message);
        }
    },
    async searchUser (req, res) {
        //  GET ALL USERS

        const users = await usersRepository.getAll();
        
        const str = req.query.userName.toLowerCase();
      
        const findingUser = users.find((item) => {
            return item.userName.toLowerCase().includes(str);
        });
        console.log(findingUser);
        findingUser ===  undefined ? res.send('This user dose not exist.') :
        res.redirect(`/lico/${findingUser.userName}`);
    }

};