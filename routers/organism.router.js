const router = require('express').Router()
const Organism = require('../controller/organism.controller.js')

router.get('/', Organism.list)

module.exports = router