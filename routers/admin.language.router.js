const router = require('express').Router()
const Language = require('../controller/admin.language.controller.js')

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

router.get('/', Language.list)

router.get('/view/:id', Language.view)

router.get('/edit/:id', Language.editView)

router.post('/edit', upload.single('image'), Language.editPost)

module.exports = router