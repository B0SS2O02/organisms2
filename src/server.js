const express = require('express')
const app = express()
const models = require('../models')
require('dotenv').config()


app.use((req, res) => {
    res.status(400).send(404)
})

app.listen(process.env.port, async () => {
    console.log('Server started')
    models.sequelize.sync()
    // try {
    //     await models.sequelize.authenticate();
    //     console.log('Connection has been established successfully.');
    // } catch (error) {
    //     console.error('Unable to connect to the database:', error);
    // }

})




module.exports = app