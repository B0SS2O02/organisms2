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

router.get('/create', Category.categoryAddGet)

router.post('/', upload.single('img'), Category.categoryAddPost)

router.get('/', Category.categoryList)

router.get('/view/:id', Category.categoryView)

router.get('/edit/:id', Category.categoryEditGet)

router.post('/edit', upload.single('image'), Category.categoryEditPut)

router.post('/delete/:id', Category.del)

module.exports = router