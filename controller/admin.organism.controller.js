 const models = require('../models')
const { navlist } = require('../src/variables.json')

exports.categoryAddGet = async (req, res) => {
    const language = req.query.lang || 1
    const langs = await models.language.findAll({
        attributes: ['id', 'title']
    })
    const category = await models.category.findAll({
        attributes: ['id', 'img'],
        include: [{
            model: models.category_lang,
            attributes: ['title', 'body'],
            where: {
                lang: langs[0].id
            }
        }],
    })
    const inputs = [
        {
            title: 'Title',
            type: 'text',
            name: 'title',
            lang: true
        },
        {
            title: 'body',
            type: 'textarea',
            name: 'body',
            lang: true
        },
        {
            title: 'Image',
            type: 'file',
            name: 'img',
            lang: false
        },
        {
            title: 'Category',
            type: 'select',
            name: 'category',
            lang: false,
            options: category
        }
    ]
    let formelements = []
    for (let i = 0; i < inputs.length; i++) {
        const element = inputs[i];
        if (element.lang) {
            for (let j = 0; j < langs.length; j++) {
                const lang = langs[j]
                let inp = element
                formelements.push({
                    title: `${lang.title} ${inp.title}`,
                    type: inp.type,
                    name: `${lang.title}-${inp.name}`
                })
            }
        } else {
            formelements.push(element)
        }
    }
    res.render('organismAdd', {
        navlist: navlist,
        formelements: formelements,
        link: '/admin/organism',
        method: 'post'
    })
}

exports.categoryAddPost = async (req, res) => {
    const langs = await models.language.findAll({
        attributes: ['id', 'title']
    })
    let langs2 = {}
    for (let i = 0; i < langs.length; i++) {
        const l = langs[i];
        langs2[l.title] = l.id
    }
    const category = await models.organism.create({
        img: req.file.path,
        category_ID: parseInt(req.body.category)
    })
    let info = {}
    for (const key in req.body) {
        if (key != 'category') {
            if (!info[key.split('-')[0]]) {
                info[key.split('-')[0]] = {}
            }
            info[key.split('-')[0]][key.split('-')[1]] = req.body[key]
        }
    }
    console.log(info)
    for (const i in info) {
        await models.organism_lang.create({
            main_ID: category.id,
            lang: langs2[i],
            body: info[i].body,
            title: info[i].title
        })
    }
    res.json({})
}

exports.organismList = async (req, res) => {
    const page = req.query.page - 1 || 0
    const count = req.query.count || 10
    const category = await models.organism.findAll({
        include: [{
            model: models.organism_lang,
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
    const lastPage = await models.organism.count()
    res.render('organism', {
        navlist: navlist,
        list: category,
        page: page + 1,
        lastPage: Math.ceil(lastPage / count),
    })
}

exports.categoryView = async (req, res) => {
    const id = req.params.id
    const category = await models.organism.findOne({
        where: {
            id: id
        },
        attributes: ['id', 'img'],
        include: [{
            model: models.organism_lang,
            attributes: ['id', 'title', 'body'],
            include: [{
                model: models.language,
                attributes: ['id', 'title']
            }]
        }]
    })
    let data = JSON.stringify(category)
    res.render('organismsView.ejs', {
        navlist: navlist,
        data: JSON.parse(data)
    })
}

exports.categoryEditGet = async (req, res) => {
    const id = req.params.id
    const langs = await models.language.findAll({
        attributes: ['id', 'title']
    })
    const category = await models.organism.findOne({
        where: {
            id: id
        },
        attributes: ['id', 'img'],
        include: [{
            model: models.organism_lang,
            attributes: ['id', 'title', 'body', 'lang'],
            include: [{
                model: models.language,
                attributes: ['id', 'title']
            }]
        }, {
            model: models.category,
            attributes: ['id', 'img'],
            include: [{
                model: models.category_lang,
                attributes: ['id', 'title'],
                where: {
                    lang: langs[0].id
                }
            }]
        }]
    })
    let select = JSON.stringify(await models.category.findAll({
        attributes: ['id'],
        include: [{
            model: models.category_lang,
            attributes: ['title'],
            where: {
                lang: langs[0].id
            }
        }]
    }))
    let data = JSON.stringify(category)

    res.render('organismEdit', {
        navlist: navlist,
        data: JSON.parse(data),
        select: JSON.parse(select),
        link: '/admin/organism/edit',
        method: 'POST'
    })
}

exports.categoryEditPut = async (req, res) => {
    console.log(req.body)
    let body = {}
    if (!!req.file) {
        body['img'] = req.file.path
    }
    body['category_ID'] = req.body.organism
    await models.organism.update(body, {
        where: {
            id: req.body.id
        }
    })
    for (const key in req.body) {
        if (key != 'id' && key != 'organism') {
            let data = {}
            data[key.split('-')[2]] = req.body[key]
            await models.organism_lang.update(data, {
                where: {
                    id: key.split('-')[0]
                }
            })
        }
    }

    res.json({})
}

exports.del = async (req, res) => {
    console.log(req.params.id)
    const result = await models.organism.destroy({
        where: {
            id: req.params.id
        }
    })
    res.send('ok')
}