const usersController = require('./controllers/usersController');
const sessionController = require('./controllers/session');
const imagesUpload = require('./controllers/imagesUpload');

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
    app.get('/lico/:userName/:idImage', );
    app.get('/lico/:userName', usersController.show);
    app.get('/lico/:userName/edit', usersController.edit);
    app.post('/lico/signup_submit', sessionController.create);
    app.post('/lico/login_submit', sessionController.loginSubmit);
    app.post('/lico/:userName/avata', upload.single('avata'), imagesUpload.uploadAvata);
    app.post('/lico/:userName/upload', upload.single('image'), imagesUpload.uploadImage);
    app.put('/lico/:userName/edit', usersController.update);
    //   app.post('/:index/upload', upload.single('image'), pages.upload);
    //   app.delete('/planet/:index', pages.deletePerson);
    //   app.get('/planet/:index', pages.showPage);
    //   app.get('/planet/:index/edit', pages.editPage);
    //   app.put('/planet/:index', pages.updateInfo);
}