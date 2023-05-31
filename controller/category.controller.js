const models = require('../models')

exports.list = async (req, res) => {
    const page = req.query.page - 1 || 0
    const count = req.query.count || 10
    const Category = await models.category.findAll({
        attributes: ['id', 'img'],
        include: [
            {
                attributes: ['title'],
                model: models.category_lang,
                include: [{
                    model: models.language,
                    attributes: ['id', 'title']
                }]
            }

        ],
        offset: page * count,
        limit: count
    })
    const Count = await models.category.count()
    res.json({
        organisms: Category,
        pages: Math.ceil(Count / count)
    })
}

exports.view = async (req, res) => {
    const Category = await models.category.findOne({
        attributes: ['id', 'img',],
        include: [{
            model: models.category_lang,
            attributes: ['title', 'body'],
            include: {
                model: models.language,
                attributes: ['id', 'title']
            }
        }, {
            model: models.organism,
            attributes: ['id', 'img'],
            include: [{
                model: models.organism_lang,
                attributes: ['title'],
                include: [{
                    model: models.language,
                    attributes: ['id', 'title']
                }]
            }]
        }]
    })
    res.json(Category)
}