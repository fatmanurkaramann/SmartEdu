const nodemailer = require('nodemailer')

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
      req.flash('success','We received your message succesfully')
      res.redirect('/contact');
    } catch (error) {
      req.flash('error','Something happened wrong.')

      res.redirect('/contact');
    }
}