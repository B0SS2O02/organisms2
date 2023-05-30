const models = require('../models')

exports.list = async (req, res) => {
    const page = req.query.page - 1 || 0
    const count = req.query.count || 10
    const Organism = await models.organism.findAll({
        offset: page * count,
        limit: count
    })
    const Count = await models.organism.count()
    res.json({
        organisms: Organism,
        pages: Count
    })
}