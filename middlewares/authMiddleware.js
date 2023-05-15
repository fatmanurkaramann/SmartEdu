const User = require('../models/User')

module.exports = (req, res, next) => {
    User.findOne({_id: req.session.userId}).then(user=>{
        if(!user) return res.redirect('/login')
        next()
    }).catch(err=>{
        console.log(err)
        return res.redirect('/login');
    })
   
  };