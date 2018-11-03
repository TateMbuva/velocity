// External Dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Modules
const auth = require('./modules/auth/index')

//App Init
const api = express()

api.use(cors())
api.use(bodyParser.urlencoded({ extended: true }))
api.use(bodyParser.json())


api.use('/auth', auth)



//Api Listen
api.listen('3000',()=>{

    console.log( "🤖  Api listenning on http://localhost:3000")

})

