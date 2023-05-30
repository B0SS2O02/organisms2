const router = require('express').Router()
const { param } = require('express-validator')
const Organism = require('../controller/organism.controller.js')

router.get('/', Organism.list)

router.get('/:id', param('id').notEmpty(), Organism.view)

module.exports = router