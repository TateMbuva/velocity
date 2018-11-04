// External Dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('./config/jwt');
const errorHandler = require('./config/errorHandler');

// Module Routers
const authRouter = require('./modules/auth/authRouter')
const partnerRouter = require('./modules/partner/partnerRouter')

//App Init
const api = express()

api.use(cors())
api.use(bodyParser.urlencoded({ extended: true }))
api.use(bodyParser.json())

//JWT auth to secure the api
api.use(jwt())

//API module entry points
api.use('/auth', authRouter)
api.use('/partner', partnerRouter)

// global error handler
api.use(errorHandler);

//Api Listen
const port =  process.env.PORT || 3000
api.listen(port,()=>{

    console.log( `🤖  Api listenning on http://localhost:${port}`)

})

