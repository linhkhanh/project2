const usersRepository = require('../repositories/usersRepository');
const moment = require('moment');

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
                const user = await usersRepository.show(req.params.userName);

                // format date
                user.createdAt = moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a');

                return res.render('show', { user, name: req.session.userName });
            } else {
                res.redirect('/lico/login');
            }

        } catch (err) {
            return res.send(err.message);
        }
    },
    
    async getAllImage (req, res) {
        try {
            if (req.session.userName) {
                const users = await usersRepository.getAll();

                // get userName of User login
                const name = req.session.userName;

                return res.render('index', { users, name });
            } else {
                return res.redirect('/lico/login');
            }
        } catch (err) {
            return res.send(err.message);
        }
        
    },
    async edit(req, res) {
        console.log('Edit page');
        if (req.params.userName === req.session.userName) {
            const user = await usersRepository.show(req.params.userName);
            res.render('edit', { user });
        } else {
            res.redirect('/lico/login');
        }
    },
    async update(req, res) {
        try {
            const user = {
                'userName': req.body.userName,
                'email': req.body.email,
                'biography': req.body.biography,
                'birthDay': req.body.birthDay,
                'location': req.body.location
            };
            req.session.userName = req.body.userName;
            await usersRepository.updateByUserName(req.params.userName, user);
            return res.redirect(`/lico/${user.userName}`);
        } catch (err) {
            console.log(err);
            return res.send(err.message);
        }
    }
};