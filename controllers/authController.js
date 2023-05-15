const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)

        res.redirect('/')


    } catch (error) {
        res.status('400').json({
            status: 'fail',
            error
        })
    }
}
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, same) => {
                if (same) {
                    // USER SESSION
                    req.session.userId = user._id
                    res.status(200).redirect('/');
                }
            });
        }

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};
exports.logoutUser = (req, res) => {
    req.session.destroy(()=> {
      res.redirect('/');
    })
  }