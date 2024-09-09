const User = require('../models/user.schema');
const bcrypt = require('bcrypt');


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
        console.log(req.body.email);
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({ email: email });
        if (userData) {
            console.log(userData);
            const passwordMatch = bcrypt.compare(password, userData.password);
            req.session.user_id = userData.id;
            req.session.is_admin = userData.is_admin;
            if (passwordMatch) {
                if (userData.is_admin == 1) {
                    res.redirect('/dashboard');
                } else {
                    res.redirect('/profile');
                }
            }

        }

    } catch (error) {
        console.log(error.message);

    }
}

module.exports = {
    loginLoader,
    verifyLogin,
}