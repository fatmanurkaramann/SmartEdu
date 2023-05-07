const express=require('express')
const mongoose=require('mongoose')
const ejs=require('ejs')
const pageRoute=require('./routes/pageRoute')
const courseRoute=require('./routes/courseRoute')
const blogRoute=require('./routes/blogRoute')
const categoryRoute=require('./routes/categoryRoute')



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

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/',pageRoute)
app.use('/courses',courseRoute)
app.use('/blog',blogRoute)

app.use('/categories',categoryRoute)

const port=3000
app.listen(port,()=>{
    console.log('3000 portunda başladı')
})