const express=require('express')
const mongoose=require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const ejs=require('ejs')
const pageRoute=require('./routes/pageRoute')
const courseRoute=require('./routes/courseRoute')
const blogRoute=require('./routes/blogRoute')
const categoryRoute=require('./routes/categoryRoute')
const userRoute=require('./routes/userRoute')

const app =express()
mongoose.connect('mongodb://localhost/smartedu-db',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Db connected')
})
.catch((error) => {
    console.error(error);
  });
app.set('view engine','ejs')

//global variable

global.userIn=null

app.use(
    session({
    secret: 'my_keyboard_cat', // Buradaki texti değiştireceğiz.
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' }),
    })
    );

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('*',(req,res,next) =>{
    userIn=req.session.userId;
    next();
})
app.use('/',pageRoute)
app.use('/courses',courseRoute)
app.use('/blog',blogRoute)
app.use('/categories',categoryRoute)
app.use('/user',userRoute)

const port=3000
app.listen(port,()=>{
    console.log('3000 portunda başladı')
})