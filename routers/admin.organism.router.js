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

router.get('/create', Organism.organismAddGet)

router.post('/', upload.single('img'), Organism.organismAddPost)

router.get('/', Organism.organismList)

router.get('/view/:id', Organism.organismView)

router.get('/edit/:id', Organism.organismEditGet)

router.post('/edit', upload.single('image'), Organism.organismEditPut)

router.post('/delete/:id', Organism.del)

module.exports = router