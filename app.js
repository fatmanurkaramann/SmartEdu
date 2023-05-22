const express = require('express')
const serverless = require('serverless-http')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload');
const flash = require('connect-flash');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override')
const ejs = require('ejs')
const pageRoute = require('./routes/pageRoute')
const courseRoute = require('./routes/courseRoute')
const blogRoute = require('./routes/blogRoute')
const categoryRoute = require('./routes/categoryRoute')
const userRoute = require('./routes/userRoute')
const router = express.Router()
const app = express()
mongoose.connect('mongodb://localhost/smartedu-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Db connected')
})
    .catch((error) => {
        console.error(error);
    });
app.set('view engine', 'ejs')

//global variable

global.userIn = null
app.use('/stylesheets/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));
app.use(
    session({
        secret: 'my_keyboard_cat', // Buradaki texti değiştireceğiz.
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' }),
    })
);
app.use(flash())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload());
app.use('*', (req, res, next) => {
    userIn = req.session.userId;
    next();
})
app.use(
    methodOverride('_method', {
      methods: ['POST', 'GET'],
    })
  );
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash()
    next()
})
app.use('/', pageRoute)
app.use('/courses', courseRoute)
app.use('/blog', blogRoute)
app.use('/categories', categoryRoute)
app.use('/user', userRoute)

app.use('./netlify/functions/api',router)
module.exports.handler=serverless(app)
const port = 3000
app.listen(port, () => {
    console.log('3000 portunda başladı')
})