const blogSetting = require('../models/blog.schema');
const user = require('../models/user.schema');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    res.send('We Are In LOGIN');

    };

    const securePassword = async (password) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            return hashedPassword;
        } catch (error) {
            console.error('Error hashing password:', error.message);
            throw new Error('Password hashing failed');
        }
    }

    const blogSetup = async (req, res) => {
        try {
            const blogs = await blogSetting.find({});
            if (blogs.length > 0) {
                res.redirect('/login');

            }
            else {
                res.render('blogSetup');
            }
        } catch (error) {
            console.error('Error fetching blogs:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }
    const blogSetupSave = async (req, res) => {
        try {
            console.log('File Info:', req.file);

            const blog_titles = req.body.blog_titles;
            const blog_image = req.file.filename;
            const blog_description = req.body.blog_description;
            const name = req.body.name;
            const email = req.body.email;
            const password = await securePassword(req.body.password);



            const newBlog = new blogSetting({
                blog_titles: blog_titles,
                blog_image: blog_image,
                blog_description: blog_description,
            });

            const saveBlog = await newBlog.save();
            console.log('Blog saved:', saveBlog);

            const newUser = new user({
                name: name,
                email: email,
                password: password,
                is_admin: 1
            });

            const savedUser = await newUser.save();
            console.log('user saved', savedUser);

            if (savedUser) {
                res.redirect('/login');

            } else {
                res.render('blogSetup', { message: 'Blog setup hase some problem' });
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }


    // const blogController1 = async (req, res) => {
    //     res.send('1st controller');
    // };

    // const blogController2 = async (req, res) => {
    //     res.send('2nd controller');
    // };

    // const blogController3 = async (req, res) => {
    //     res.send('Setup Your Blog');
    // };

    module.exports={
        blogSetup,
        login,
        blogSetupSave,
    }