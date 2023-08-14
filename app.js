'use strict'
global.__basedir = __dirname
const config = require('./config/config.js')
const express = require('express')
const app = express()

app.get('/health-check', (req, res) => {
    return res.json({ status: 'api running smoothly' })
})

app.listen(config.PORT, config.HOST, () => {
    console.log(`Server started and running at port ${config.PORT}`)
})
