// Dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


//App Init
const api = express()

api.use(cors())
api.use(bodyParser.urlencoded({ extended: true }))
api.use(bodyParser.json())



//Api Listen
api.listen('3000',()=>{
    
    console.log( "🤖  Api listenning on http://localhost:3000")

})

