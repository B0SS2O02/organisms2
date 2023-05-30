const models = require('../models')

exports.list = async (req, res) => {
    const language = await models.language.findAll({
        attributes:['id','title']
    })
    res.json(language)
}