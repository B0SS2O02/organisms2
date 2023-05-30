const router = require('express').Router()
const Category = require('../controller/admin.category.controller')

const multer = require('multer');
const storageConfig = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './public/image')
    },
    filename: (req, file, cb) => {
        let time = new Date().getTime().toString()
        cb(null, time + '-' + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/gif' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({ storage: storageConfig, fileFilter: fileFilter })

router.get('/create', Category.Create_View)

router.post('/', upload.single('img'), Category.Create)

router.get('/', Category.List)

router.get('/view/:id', Category.View)

router.get('/edit/:id', Category.Edit_View)

router.post('/edit', upload.single('image'), Category.Edit)

router.post('/delete/:id', Category.Delete)

module.exports = router