const express = require('express')

const app = express();

const { PORT } = require('./config/config')

const startAndSetupServer = async() =>{

    app.listen(PORT , async() =>{
        console.log('Server Started at PORT', PORT)
    })
}

startAndSetupServer()