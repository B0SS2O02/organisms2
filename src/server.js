const express = require('express')
const app = express()
const models = require('../models')0
const swaggerUi = require("swagger-ui-express")
const swaggerDoc = require("./swagger");


const Admin = require('../routers/admin.router.js')
const AdminCategory = require('../routers/admin.category.router')
const AdminOrganism = require('../routers/admin.organism.router')
const Organism = require('../routers/organism.router.js')

require('dotenv').config()


app.use(express.json())

app.use('/public', express.static('public'))

app.set('view engine', 'ejs');

app.use('/admin/category', AdminCategory)

app.use("/admin/organism", AdminOrganism)

app.use('/api/organism', Organism)

app.use('/admin', Admin)



// app.use((req, res) => {
//     res.status(400).send(404)
// })

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