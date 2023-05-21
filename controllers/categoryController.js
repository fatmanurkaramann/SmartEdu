const Category = require('../models/Category');

exports.createCategory = async (req, res) => {

    try {
        const category = Category.create(req.body);

        res.status(201).redirect('/user/dashboard')


    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}
exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndRemove(req.params.id)
        res.status('200').redirect('/user/dashboard')
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}