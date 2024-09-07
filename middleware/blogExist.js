
const blogSetting = require('../models/blog.schema');

const isBlogExistOrNot = async (req, res, next) => {
    try {
        const blogs = await blogSetting.find({});

        if (blogs.length == 0 && req.originalUrl != '/blog-setup') {
            res.redirect('/blog-setup');

        }
        else {
            next();
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error');

    }
}

module.exports = {
    isBlogExistOrNot,
};
