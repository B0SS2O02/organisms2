const models = require('../models')
const {navlist}=require('../src/variables.json')


exports.main = async (req, res) => {
    console.log(navlist)
    res.render('main', {
        navlist: navlist
    })
}

exports.redirect = (req, res) => {
    res.redirect('./admin/main')
}

