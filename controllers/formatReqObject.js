const bcrypt = require('bcrypt');

module.exports =  (reqBody) => {
    const hashedString = bcrypt.hashSync(reqBody.password, bcrypt.genSaltSync(10));
        const user = {
            'userName': reqBody.userName,
            'email': reqBody.email,
            'password': hashedString,
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
