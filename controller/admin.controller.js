const models = require('../models')
const { navlist } = require('../src/variables.json')


exports.main = async (req, res) => {
    let Counts = []
    Counts.push({
        category: await models.category.count()
    })
    Counts.push({
        organism: await models.organism.count()
    })

    res.render('main', {
        navlist: navlist,
        count: Counts
    })
}

exports.redirect = (req, res) => {
    res.redirect('./admin/main')
}

