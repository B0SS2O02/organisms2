const router = require('express').Router()
const Kindom = require('../controller/kindom.controller.js')

router.get('/', Kindom.list)

router.get('/:id', Kindom.view)

module.exports = router