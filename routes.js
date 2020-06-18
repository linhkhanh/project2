const usersController = require('./controllers/usersController');
const sessionController = require('./controllers/session');
const imagesUpload = require('./controllers/imagesUpload');
const imageController = require('./controllers/image');

const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// CLOUDINARY
cloudinary.config({
    cloud_name: 'dt5rqi1l9',
    api_key: '552321872584896',
    api_secret: 'FC0feHoGttL0P8HFBDiZNWthplo'
});

module.exports = (app) => {
    app.get('/', (req, res) => { res.redirect('/lico') });
    app.get('/lico', usersController.getAll);
    app.get('/lico/logout', sessionController.logOut);
    app.get('/lico/signup', sessionController.new);
    app.get('/lico/login', sessionController.logIn);
    app.get('/lico/index', usersController.getAllImage);
    app.get('/lico/:userName/edit', usersController.edit);
    app.get('/api/:userName/:idImage', imageController.show);
    app.get('/lico/:userName/:idImage', imagesUpload.showImage);
    app.get('/lico/:userName', usersController.show);
    app.post('/lico/signup_submit', sessionController.create);
    app.post('/lico/login_submit', sessionController.loginSubmit);
    app.post('/lico/:userName/avata', upload.single('avata'), imagesUpload.uploadAvata);
    app.post('/lico/:userName/upload', upload.single('image'), imagesUpload.uploadImage);
    app.post('/lico/:userName/:idImage', imagesUpload.commentImage);
    app.put('/lico/:userName/edit', usersController.update);
   
}