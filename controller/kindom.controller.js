const models = require('../models')

exports.list = async (req, res) => {
    const kindom = await models.kindom.findAll({
        attributes: ['id'],
        include: [{
            model: models.kindom_lang,
            attributes: ['title']
        }]
    })
    res.json(kindom)
}
exports.view = async (req, res) => {
    const kindom = await models.kindom.findOne({
        attributes: ['id', 'img',],
        include: [{
            model: models.kindom_lang,
            attributes: ['title', 'body'],
            include: {
                model: models.language,
                attributes: ['id', 'title']
            }
        }, {
            model: models.category,
            attributes: ['id', 'img'],
            include: [{
                model: models.category_lang,
                attributes: ['title'],
                include: [{
                    model: models.language,
                    attributes:['id','title']
                }]
            }]
        }]
    })
    res.json(kindom)
}