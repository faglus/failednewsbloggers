// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();

// require('dotenv').config();


// //newzblogger router- 

// const adminRouter = require('./routes/admin.route');
// const isBlogExist=require('./middleware/blogExist');
// const userRoute =require('./routes/user.route')



// //Mongoose connection  
// const database_Url = process.env.DATABASE_URL;
// const dbName = 'newzblogger';

// mongoose.connect(database_Url);
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))
// db.once('open', () => {
//     console.log('Connected to MongoDB', dbName);
// });



// //Trigger or Global mount 
// app.use(isBlogExist.isBlogExistOrNot);


// app.use('/', adminRouter);
// app.use('/',userRoute);


// app.get('/', (req, res) => {
//     res.send("This is NEWZBLOGGER project");

// });




// //Port running 
// const PORTNo = process.env.PORT;
// app.listen(PORTNo, () => {
//     console.log(`Server started at PORT No ${PORTNo}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// Import routes and middleware
const isBlogExist = require('./middleware/blogExist');
const adminRouter = require('./routes/admin.route');
const userRouter = require('./routes/user.route');

// Mongoose connection
const databaseUrl = process.env.DATABASE_URL;
const dbName = 'newzblogger';

mongoose.connect(databaseUrl, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log(`Connected to MongoDB: ${dbName}`);
});

// Global middleware to check if the blog exists
app.use(isBlogExist.isBlogExistOrNot)

// Use routes
app.use('/', adminRouter);
app.use('/', userRouter);

// Root route
app.get('/', (req, res) => {
    res.send("Welcome to the NEWZBLOGGER project!");
});

// Start server on specified port
const PORTNo = process.env.PORT 
app.listen(PORTNo, () => {
    console.log(`Server started at PORT No ${PORTNo}`);
});
