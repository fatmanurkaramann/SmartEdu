const express=require('express')
const mongoose=require('mongoose')
const ejs=require('ejs')
const pageController=require('./controllers/pageController')
const pageRoute=require('./routes/pageRoute')
const courseRoute=require('./routes/courseRoute')


const app =express()
mongoose.connect('mongodb://localhost/smartedu-db',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
}).then(()=>{
    console.log('Db connected')
})
app.set('view engine','ejs')

app.use(express.static('public'))

app.use('/',pageRoute)
app.use('/courses',courseRoute)

const port=3000
app.listen(port,()=>{
    console.log('3000 portunda başladı')
})