const router = require('express').Router()
const Category = require('../controller/category.controller.js')

router.get('/', Category.list)

router.get('/:id', Category.view)

module.exports = router