const usersRepository = require('../repositories/usersRepository');
const moment = require('moment');
const cloudinary = require('cloudinary').v2;
// define errors
let errors = {
    errUserName: '',
    errUniqueUserName: '',
    errUserNameValidation: '',
    errPassword: '',
    errPasswordValidaion: '',
    errUniqueEmail: '',
    errEmail: ''
};
// define rule for userName
const regex = new RegExp(/^[a-zA-Z0-9_\.-]*$/);

//  format request.body object 
const formatRequestObject = (reqBody) => {
    const user = {
        'userName': reqBody.userName,
        'email': reqBody.email,
        'password': reqBody.password,
        'createdAt': new Date()
    };
    if (reqBody.female === "on") {
        user.gender = "female";
        user.avata = '/images/female.png'
    } else if (reqBody.male === "on") {
        user.gender = "male";
        user.avata = '/images/male.jpg'
    } else {
        user.gender = "male";
        user.avata = '/images/male.jpg'
    }
    return user;
}
module.exports = {
    new(req, res) {
        res.render('signup', {
            errUserName: errors.errUserName,
            errUserNameValidation: errors.errUserNameValidation,
            errPassword: errors.errPassword,
            errPasswordValidaion: errors.errPasswordValidaion,
            errUniqueUserName: errors.errUniqueUserName,
            errUniqueEmail: errors.errUniqueEmail
        })
    },
    logIn(req, res) {
        res.render('login', {
            errEmail: errors.errEmail,
            errPassword: errors.errPassword
        });
    },
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

                // change list od users to make it just display the other users
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
            if(req.session.userName) {
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
    async create(req, res) {
        // Reset errors
        errors = {
            errUserName: '',
            errUniqueUserName: '',
            errUserNameValidation: '',
            errPassword: '',
            errPasswordValidaion: '',
            errUniqueEmail: '',
            errEmail: ''
        }
        try {
            if (req.body.password === req.body.confirmPassword &&
                req.body.userName.length >= 3 && req.body.userName.length <= 30 &&
                regex.test(req.body.userName)) {

                // get data from req.body and format data
                const user = formatRequestObject(req.body)

                // Create new user
                const result = await usersRepository.create(user);
                return res.redirect('/lico/login');
            } else {
                throw new Error("FAIL VALIDATION...")
            }
        } catch (err) {
            console.log(err);
            // Check unique userName and unique email
            if (err.keyValue) {
                // check unique userName
                if (err.keyValue.userName) {
                    errors.errUniqueUserName = "** This User Name is not available. **"
                }

                // check unique email;
                if (err.keyValue.email) {
                    errors.errUniqueEmail = "** This email is used. **";
                }
            }

            // check Password and confirm password
            if (req.body.password !== req.body.confirmPassword) {
                errors.errPassword = "** You enter wrong password. **"
            }

            // check length of password
            if (req.body.password.length < 5) {
                errors.errPasswordValidaion = "** Your password is too short. Please enter new password. **"
            }
            // check length of user name
            if (req.body.userName.length < 3 || req.body.userName.length > 30) {
                errors.errUserNameValidation = "** Your user name is too short / too long. **"
            }

            // check regular expression for userName
            if (!regex.test(req.body.userName)) {
                errors.errUserName = "** Your user name must not have space, and some special characters ($, %, ^, @, `, (,), (,)) **"
            }

            return res.redirect('/lico/signup');
        }
    },
    async loginSubmit(req, res) {
        // reset errors
        errors.errEmail = '';
        errors.errPassword = '';

        try {
            const user = await usersRepository.getOneByEmail(req.body.email);
            if (req.body.password === user.password) {
                req.session.userName = user.userName;
                return res.redirect('/lico/');
            } else {
                errors.errPassword = "** Wrong password. Please enter password again. **";
                return res.redirect('/lico/login');
            }
        } catch (err) {
            console.log(err);
            errors.errEmail = `** ${err.message} **`;
            return res.redirect('/lico/login');
        }
    },
    logOut: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            res.redirect('/lico/login');
        })
    },
    uploadAvata: async (req, res, next) => {
        console.log(req.params.userName);

        /// CLOUDINARY
        await cloudinary.uploader.upload(req.file.path,
            async function (error, result) {
                console.log(result);
                const response = await usersRepository.updateByUserName( req.params.userName , { avata: result.url });
            }
        )
        res.redirect(`/lico/${req.session.userName}`);
    }
    // async getOneByName (req, res) {
    //     try {
    //         const item = await shopRepository.getOneByName(req.params.name);
    //         return res.render('shop/show', { item });
    //     } catch (err) {
    //         return res.render('errors/404', { err });
    //     }
    // },
    // async update (req, res) {
    //     try {
    //         const item = {
    //             'name': req.body.name,
    //             'description': req.body.description,
    //             'img': req.body.img,
    //             'price': parseInt(req.body.price),
    //             'qty': parseInt(req.body.qty)
    //         };
    //         await shopRepository.updateByName(req.params.name, item);
    //         return res.send(item);
    //     } catch (err) {
    //         return res.render('errors/404', { err });
    //     }
    // }
};