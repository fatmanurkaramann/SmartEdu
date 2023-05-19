const nodemailler = require('nodemailer')

exports.getHomePage = (req, res) => {
    console.log(req.session.userId)
    res.render('index', {
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

exports.sendEmail =async (req, res) => {
    const outputMessage = `
    <h1>Message Details</h1>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>email: ${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.messages}</p> `
    let transporter = nodemailler.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "fatmanurkaraman74@gmail.com", // gmail hesabı
            pass: "inbugkmaryubddgb", // gmail şifresi veya uygulama şifresi
        },
    });

    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <fatmanurkaraman74@gmail.com>', // sender address
        to: "fatmanur.karaman@outlook.com", // list of receivers
        subject: "SMART EDU", // Subject line
        text: "Smart Edu", // plain text body
        html: outputMessage, // html body
      });
    console.log(req.body)
    res.redirect('/contact')
}