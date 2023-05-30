const models = require('../models')
const { navlist } = require('../src/variables.json')

exports.list = async (req, res) => {
    const page = req.query.page - 1 || 0
    const count = req.query.count || 10
    const kindom = await models.kindom.findAll({
        include: [{
            model: models.kindom_lang,
            attributes: ['body', 'title'],
            include: [{
                model: models.language,
                attributes: ['title']
            }]
        }],
        attributes: ['id', 'img',],
        offset: page * count,
        limit: count
    })
    const lastPage = await models.kindom.count()
    res.render('kindom', {
        navlist: navlist,
        list: kindom,
        page: page + 1,
        lastPage: Math.ceil(lastPage / count),
    })
}

exports.view = async (req, res) => {
    const id = req.params.id
    const kindom = await models.kindom.findOne({
        where: {
            id: id
        },
        attributes: ['id', 'img'],
        include: [{
            model: models.kindom_lang,
            attributes: ['id', 'title', 'body'],
            include: [{
                model: models.language,
                attributes: ['id', 'title']
            }]
        }]
    })
    let data = JSON.stringify(kindom)
    res.render('kindomview', {
        navlist: navlist,
        data: JSON.parse(data)
    })
}

exports.editView = async (req, res) => {
    const id = req.params.id
    const langs = await models.language.findAll({
        attributes: ['id', 'title']
    })
    const category = await models.kindom.findOne({
        where: {
            id: id
        },
        attributes: ['id', 'img'],
        include: [{
            model: models.kindom_lang,
            attributes: ['id', 'title', 'body', 'lang'],
            include: [{
                model: models.language,
                attributes: ['id', 'title']
            }]
        }]
    })

    let data = JSON.stringify(category)

    res.render('kindomEdit', {
        navlist: navlist,
        data: JSON.parse(data),
        link: '/admin/kindom/edit',
        method: 'POST'
    })
}

exports.editPost = async (req, res) => {
    console.log('------------------',req.body)
    let body = {}
    if (!!req.file) {
        body['img'] = req.file.path
    }
    await models.kindom.update(body, {
        where: {
            id: req.body.id
        }
    })
    for (const key in req.body) {
        if (key != 'id') {
            let data = {}
            data[key.split('-')[2]] = req.body[key]
            await models.kindom_lang.update(data, {
                where: {
                    id: key.split('-')[0]
                }
            })
        }
    }

    res.json({})
}