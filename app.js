const express=require('express')
const mongoose=require('mongoose')
const ejs=require('ejs')
const pageController=require('./controllers/pageController')
const pageRoute=require('./routes/pageRoute')
const courseRoute=require('./routes/courseRoute')


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

const port=3000
app.listen(port,()=>{
    console.log('3000 portunda başladı')
})