const express=require('express')
const ejs=require('ejs')
const pageController=require('./controllers/pageController')
const pageRoute=require('./routes/pageRoute')

const app =express()

app.set('view engine','ejs')

app.use(express.static('public'))

app.use('/',pageRoute)

const port=3000
app.listen(port,()=>{
    console.log('3000 portunda başladı')
})