const express = require('express')
const app = express()
const models = require('../models')
const swaggerUi = require("swagger-ui-express")
const swaggerDoc = require("./swagger");


const Admin = require('../routers/admin.router.js')
const AdminCategory = require('../routers/admin.category.router')
const AdminOrganism = require('../routers/admin.organism.router')
const AdminKindom=require('../routers/admin.kindom.router.js')
const AdminLanguage=require('../routers/admin.language.router.js')
const Organism = require('../routers/organism.router.js')
const Category=require('../routers/category.router.js')
const Language=require('../routers/language.router.js')
const Kindom=require('../routers/kindom.router.js')

require('dotenv').config()
const cors = require('cors')

const corsOptions = {
    origin: '*',
}
app.use(cors(corsOptions))

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(express.json())

app.use('/public', express.static('public'))

app.set('view engine', 'ejs');

app.use('/admin/category', AdminCategory)
app.use("/admin/organism", AdminOrganism)
app.use("/admin/kindom",AdminKindom)
app.use('/admin/language',AdminLanguage)

app.use('/api/organism', Organism)
app.use('/api/category', Category)
app.use('/api/kindom',Kindom)
app.use('/api/language',Language)

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