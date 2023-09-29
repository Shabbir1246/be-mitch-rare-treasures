const express = require('express')
const app = express()
const {getTreasures} = require('../server/controllers/controllers')
app.use(express.json())
const {handleCustomErrors} = require('../server/controllers/error.controllers')



app.get('/api/healthcheck', (req, res) =>{
    res.status(200).send()
})

app.get('/api/treasures', getTreasures)

// app.get('/api/treasures?sort_by', getTreasures)

app.all('/*', (req, res, next)=>{
    res.status(404).send({msg: 'Path not found'})
    next()
})

app.use(handleCustomErrors)

module.exports = app