const nodemailer = require('nodemailer')
const Course = require('../models/Course')
const User = require('../models/User')
const Category = require('../models/Category')

exports.getHomePage = async (req, res) => {
  const course = await Course.find().sort('-createdDate').limit(2)
  const totalCourse = await Course.find().countDocuments()
  const totalStudents = await User.countDocuments({ role: 'student' })
  const totalTeachers = await User.countDocuments({ role: 'teacher' })
  res.render('index', {
    course,
    totalCourse,
    totalStudents,
    totalTeachers,
    page_name: 'index'
  })
}

exports.getAboutPage = (req, res) => {
  res.render('about', {
    page_name: 'about'
  })
}

exports.getRegisterPage = (req, res) => {
  res.render('register', {
    page_name: 'register'
  })
}

exports.getLoginPage = (req, res) => {
  res.render('login', {
    page_name: 'login'
  })
}
exports.getContactPage = (req, res) => {
  res.render('contact', {
    page_name: 'contact'
  })
}
exports.getPricingPage = (req, res) => {
  res.render('pricing',
    {
      page_name: 'pricing'
    })
}
exports.getCategoryPage = async (req, res) => {
  try {
    const categories = await Category.find()
    const user = await User.findById(req.session.userId)
    const users= await User.find()
    res.render('category',
      {
        page_name: 'category',
        categories,
        user,
        users
      })
  } catch (error) {
    console.log(error)
  }

}
exports.getUserPage=async(req,res)=>{
try {
  const user = await User.findById(req.session.userId)
  const users= await User.find()
  res.render('user',
    {
      page_name: 'user',
      user,
      users
    })
} catch (error) {
  console.log(error)
}
}
exports.sendEmail = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.messages;

  // Check if the email field is empty
  if (!email && !name && !message) {
    console.log("Email field cannot be empty.");
    res.redirect('/contact'); // Redirect the user back to the contact page
    return; // Exit the function to prevent sending the email
  }

  const outputMessage = `
    <h1>Message Details</h1>
    <ul>
    <li>Name: ${name}</li>
    <li>Email: ${email}</li>
    </ul>
    <h1>Message</h1>
    <p>${message}</p>`;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "fatmanurkaraman74@gmail.com",
      pass: "inbugkmaryubddgb",
    },
  });

  try {
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <fatmanurkaraman74@gmail.com>',
      to: "fatmanur.karaman@outlook.com",
      subject: "SMART EDU",
      text: "Smart Edu",
      html: outputMessage,
    });
    console.log(req.body);
    req.flash('success', 'We received your message succesfully')
    res.redirect('/contact');
  } catch (error) {
    req.flash('error', 'Something happened wrong.')

    res.redirect('/contact');
  }
}