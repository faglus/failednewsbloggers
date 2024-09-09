const express = require('express');
const admin_router = express();

const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');


const adminController = require('../controller/admin.controller');


// multer
admin_router.use(bodyParser.json());
admin_router.use(bodyParser.urlencoded({ extended: true }));
admin_router.use(express.static('public'));


// ejs
admin_router.set('view engine', 'ejs');
admin_router.set('views', './views');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../public/images');
        console.log('Resolved upload path',uploadPath);
        cb(null, uploadPath);

    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);

    }
});
const upload = multer({ storage: storage });



admin_router.get('/login', adminController.login);

admin_router.get('/blog-setup', adminController.blogSetup);

admin_router.post('/blog-setup',upload.single('blog_image'),adminController.blogSetupSave);

// admin_router.get('/dashboard',adminL)
module.exports = admin_router;








