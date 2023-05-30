const router = require('express').Router()
const Organism = require('../controller/admin.organism.controller')

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

router.get('/create', Organism.categoryAddGet)

router.post('/', upload.single('img'), Organism.categoryAddPost)

router.get('/', Organism.organismList)

router.get('/view/:id', Organism.categoryView)

router.get('/edit/:id', Organism.categoryEditGet)

router.post('/edit', upload.single('image'), Organism.categoryEditPut)

module.exports = router