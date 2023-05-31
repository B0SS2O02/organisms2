const models = require('../models')
const { navlist } = require('../src/variables.json')

exports.list = async (req, res) => {
    const page = req.query.page - 1 || 0
    const count = req.query.count || 10
    const language = await models.language.findAll({
        attributes: ['id', 'title', 'img'],
        offset: page * count,
        limit: count
    })
    const lastPage = await models.language.count()
    res.render('language', {
        PageType: 'list',
        navlist: navlist,
        list: language,
        page: page + 1,
        lastPage: Math.ceil(lastPage / count),
    })
}

exports.view = async (req, res) => {
    const id = req.params.id
    const language = await models.language.findOne({
        where: {
            id: id
        },
        attributes: ['id', 'title', 'img'],

    })
    let data = JSON.stringify(language)
    res.render('language', {
        PageType:'view',
        navlist: navlist,
        data: JSON.parse(data)
    })
}

exports.editView = async (req, res) => {
    const id = req.params.id
    const category = await models.language.findOne({
        where: {
            id: id
        },
        attributes: ['id', 'title', 'img'],
    })
    let data = JSON.stringify(category)

    res.render('language', {
        PageType:'edit',
        navlist: navlist,
        data: JSON.parse(data),
        link: '/admin/language/edit',
        method: 'POST'
    })
}

exports.editPost = async (req, res) => {
    console.log(req.body, req.file)
    let body = {}
    if (!!req.file) {
        body['img'] = req.file.path
    }
    body['title'] = req.body.title
    await models.language.update(body, {
        where: {
            id: req.body.id
        }
    })
    res.json({})
}