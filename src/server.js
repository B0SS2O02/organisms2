const express = require('express')
const app = express()
const models = require('../models')
require('dotenv').config()

app.listen(process.env.port, async () => {
    console.log('Server started')
    try {
        await models.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

})




module.exports = app