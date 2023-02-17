const express = require('express')
const morgan = require('morgan')
const rateLimiter = require('express-rate-limit')
const axios = require('axios')
const app = express();

const { createProxyMiddleware } = require('http-proxy-middleware')

const { PORT } = require('./config/config')
const limiter = rateLimiter({
    windowMs:2*60*1000,
    max:5
})
app.use(morgan('combined'))
app.use(limiter)
const startAndSetupServer = async() =>{
    app.use('/',async(req,res,next)=>{
        try {
            console.log(req.headers['x-access-token'])
            const response = await axios.get('http://localhost:3001/api/v1/isAuthenticated',{
            headers: {
                'x-access-token':req.headers['x-access-token']
            }})
            console.log(response)
        } catch (error) {
           return  res.status(401).json({
                message:'UNaUTHORIZED REQUEST'
            })
        }
        next()
       })
    
    
    app.use('/flightService',createProxyMiddleware({target:'http://localhost:3002/', changeOrigin:true}))
    app.listen(PORT , async() =>{
        console.log('Server Started at PORT', PORT)
    })
}

startAndSetupServer()