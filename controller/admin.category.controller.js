const models = require('../models')
const { navlist } = require('../src/variables.json')

exports.Create_View = async (req, res) => {
    const language = req.query.lang || 1
    const langs = await models.language.findAll({
        attributes: ['id', 'title']
    })
    const kindoms = await models.kindom.findAll({
        attributes: ['id', 'img'],
        include: [{
            model: models.kindom_lang,
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
            title: 'Kindom',
            type: 'select',
            name: 'kindom',
            lang: false,
            options: kindoms
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
    res.render('Category', {
        PageType: 'create',
        navlist: navlist,
        formelements: formelements,
        link: '/admin/category',
        method: 'post'
    })
}

exports.Create = async (req, res) => {
    const langs = await models.language.findAll({
        attributes: ['id', 'title']
    })
    let langs2 = {}
    for (let i = 0; i < langs.length; i++) {
        const l = langs[i];
        langs2[l.title] = l.id
    }
    const category = await models.category.create({
        img: req.file.path,
        kindom_ID: parseInt(req.body.kindom)
    })
    let info = {}
    for (const key in req.body) {
        if (key != 'kindom') {

            if (!info[key.split('-')[0]]) {
                info[key.split('-')[0]] = {}
            }
            info[key.split('-')[0]][key.split('-')[1]] = req.body[key]
        }
    }
    for (const i in info) {
        await models.category_lang.create({
            main_ID: category.id,
            lang: langs2[i],
            body: info[i].body,
            title: info[i].title
        })
    }
    res.json({})
}

exports.List = async (req, res) => {
    const page = req.query.page - 1 || 0
    const count = req.query.count || 10
    const category = await models.category.findAll({
        include: [{
            model: models.category_lang,
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
    const lastPage = await models.category.count()
    res.render('Category', {
        PageType: 'list',
        navlist: navlist,
        list: category,
        page: page + 1,
        lastPage: Math.ceil(lastPage / count),
    })
}

exports.View = async (req, res) => {
    const id = req.params.id
    const category = await models.category.findOne({
        where: {
            id: id
        },
        attributes: ['id', 'img'],
        include: [{
            model: models.category_lang,
            attributes: ['id', 'title', 'body'],
            include: [{
                model: models.language,
                attributes: ['id', 'title']
            }]
        }]
    })
    console.log(category)
    let data = JSON.stringify(category)
    res.render('Category', {
        PageType: 'view',
        navlist: navlist,
        data: JSON.parse(data)
    })
}

exports.Edit_View = async (req, res) => {
    const id = req.params.id
    const langs = await models.language.findAll({
        attributes: ['id', 'title']
    })
    const category = await models.category.findOne({
        where: {
            id: id
        },
        attributes: ['id', 'img'],
        include: [{
            model: models.category_lang,
            attributes: ['id', 'title', 'body', 'lang'],
            include: [{
                model: models.language,
                attributes: ['id', 'title']
            }]
        }, {
            model: models.kindom,
            attributes: ['id', 'img'],
            include: [{
                model: models.kindom_lang,
                attributes: ['id', 'title'],
                where: {
                    lang: langs[0].id
                }
            }]
        }]
    })
    let select = JSON.stringify(await models.kindom.findAll({
        attributes: ['id'],
        include: [{
            model: models.kindom_lang,
            attributes: ['title'],
            where: {
                lang: langs[0].id
            }
        }]
    }))
    let data = JSON.stringify(category)

    res.render('Category', {
        PageType: 'edit',
        navlist: navlist,
        data: JSON.parse(data),
        select: JSON.parse(select),
        link: '/admin/category/edit',
        method: 'POST'
    })
}

exports.Edit = async (req, res) => {
    let body = {}
    const dataOld = await models.organism.findOne({
        where: {
            id: req.body.id
        }
    })
    if (!!req.file) {
        body['img'] = req.file.path
        try {
            fs.unlinkSync(dataOld.img);
            console.log(`successfully deleted ${dataOld.img}`);
        } catch (err) {
            console.log(err)
        }

    }
    body['kindom_ID'] = req.body.kindom
    await models.category.update(body, {
        where: {
            id: req.body.id
        }
    })
    for (const key in req.body) {
        if (key != 'id' && key != 'kindom') {
            let data = {}
            data[key.split('-')[2]] = req.body[key]
            await models.category_lang.update(data, {
                where: {
                    id: key.split('-')[0]
                }
            })
        }
    }
    res.json({})
}

exports.Delete = async (req, res) => {
    console.log(req.params.id)
    const dataOld = models.category.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!!req.file) {
        try {
            fs.unlinkSync(dataOld.img);
            console.log(`successfully deleted ${dataOld.img}`);
        } catch (err) {
            console.log(err)
        }
    }
    const result = await models.category.destroy({
        where: {
            id: req.params.id
        }
    })
    res.send('ok')
}