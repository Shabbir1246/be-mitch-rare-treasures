const express = require('express')
const app = express()
const {getTreasures} = require('../server/controllers/controllers')
app.use(express.json())


app.get('/api/healthcheck', (req, res) =>{
    res.status(200).send()
})

app.get('/api/treasures', getTreasures)

module.exports = app