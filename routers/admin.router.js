const router = require('express').Router()
const Admin = require('../controller/admin.controller.js')


router.get('/', Admin.redirect)

router.get('/main', Admin.main)




module.exports = router