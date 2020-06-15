const usersRepository = require('../repositories/usersRepository');
let errors = {
    errUserName: '',
    errUniqueUserName: '',
    errUserNameValidation: '',
    errPassword: '',
    errPasswordValidaion: '',
    errUniqueEmail: ''
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
    // async getAll (req, res) {
    //     try {
    //         const items = await shopRepository.getAll();
    //         return res.render('shop/index', { items });
    //     } catch (err) {
    //         return res.render('errors/404', { err });
    //     }
    // },
    // async show (req, res) {
    //     try {
    //         const item = await shopRepository.show(req.params.name);
    //         return res.send(item);
    //     } catch (err) {
    //         return res.render('errors/404', { err });
    //     }
    // },
    async create(req, res) {
        try {
            errors = {
                errUserName: '',
                errUniqueUserName: '',
                errUserNameValidation: '',
                errPassword: '',
                errPasswordValidaion: '',
                errUniqueEmail: ''
            }

            const regex = new RegExp(/^[a-zA-Z0-9_\.-]*$/);
            if (req.body.password === req.body.confirmPassword &&
                req.body.userName.length >= 3 && req.body.userName.length <= 30 &&
                regex.test(req.body.userName)) {
                // get data from req.body and format data
                const user = {
                    'userName': req.body.userName,
                    'email': req.body.email,
                    'password': req.body.password
                };
                if (req.body.female === "on") user.female = true;
                if (req.body.male === "on") user.male = true;
                const result = await usersRepository.create(user);
                return res.send(result);
            } else {
                throw new Error("Wrong...")
            }
        } catch (err) {
            const regex = new RegExp(/^[a-zA-Z0-9_\.-]*$/);
           
        // Check unique userName and unique email
            if(err.keyValue) {
                // check unique userName
                if(err.keyValue.userName) {
                    errors.errUniqueUserName = "** This User Name is not available. **"
                }

                // check unique email;
                if(err.keyValue.email) {
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