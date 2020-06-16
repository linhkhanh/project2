const usersController = require('./controllers/usersController');
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
  app.get('/lico/signup', usersController.new);
  app.get('/lico/login', usersController.logIn);
  app.get('/lico/home', usersController.getAll);
  app.get('/lico/:userName', usersController.show);
  app.post('/lico/signup_submit', usersController.create);
  app.post('/lico/login_submit', usersController.loginSubmit);
//   app.post('/:index/upload', upload.single('image'), pages.upload);
//   app.delete('/planet/:index', pages.deletePerson);
//   app.get('/planet/:index', pages.showPage);
//   app.get('/planet/:index/edit', pages.editPage);
//   app.put('/planet/:index', pages.updateInfo);
}