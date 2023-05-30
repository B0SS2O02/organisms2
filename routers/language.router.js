const router = require('express').Router()
const Language=require('../controller/language.controller.js')

router.get('/',Language.list)

module.exports = router