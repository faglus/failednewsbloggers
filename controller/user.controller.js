// const User = require('../models/user.schema');
// const bcrypt = require('bcrypt');


const loginLoader = async (req, res) => {
    try {
        res.render('login');

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
}

const verifyLogin = async (req, res) => {
    try {

    } catch (error) {
        console.log(error.message);

    }
}

module.exports = {
    loginLoader,
    verifyLogin,
}