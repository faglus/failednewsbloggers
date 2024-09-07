const express = require('express');
const user_router = express();
require('dotenv').config();
const path = require('path');

const bodyParser = require('body-parser');
user_router.use(bodyParser.json());
user_router.use(bodyParser.urlencoded({ extended: true }));

const session = require('express-session');


user_router.set('view engine', 'ejs');
user_router.set('views', './views');

user_router.use(express.static(path.join(__dirname, 'public')));

const sessionSecretKey = process.env.SESSION_SECRET_KEY;

user_router.use(session({
    secret: sessionSecretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

const userController = require('../controller/user.controller');

user_router.get('/login', userController.loginLoader );
user_router.post('/login', userController.verifyLogin );

module.exports = user_router;
