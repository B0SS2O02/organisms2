const express = require('express')
const app = express()
const models = require('../models')
const Admin = require('../routers/admin.router.js')
require('dotenv').config()




app.use('/public', express.static('public'))

app.set('view engine', 'ejs');

app.use('/admin', Admin)

app.use((req, res) => {
    res.status(400).send(404)
})

app.listen(process.env.port, async () => {
    console.log('Server started')
    try {
        await models.sequelize.authenticate();
        models.sequelize.sync()
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

})




module.exports = app