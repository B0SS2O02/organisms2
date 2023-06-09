const models = require('../models')

exports.list = async (req, res) => {
    const page = req.query.page - 1 || 0
    const count = req.query.count || 10
    const Organism = await models.organism.findAll({
        attributes: ['id', 'img'],
        include: [
            {
                attributes: ['title'],
                model: models.organism_lang,
                include: [{
                    model: models.language,
                    attributes: ['id', 'title']
                }]
            }

        ],
        offset: page * count,
        limit: count
    })
    const Count = await models.organism.count()
    res.json({
        organisms: Organism,
        pages: Math.ceil(Count / count)
    })
}

exports.view = async (req, res) => {
    const Organism = await models.organism.findOne({
        attributes: ['id', 'img'],
        where: {
            id: req.params.id
        },
        include: [{
            model: models.organism_lang,
            attributes: ['title', 'body'],
            include: {
                model: models.language,
                attributes: ['id', 'title']
            }
        }]
    })
    res.json(Organism)
}