const router = require('express').Router()
const adminService = require('./adminService')
const config = require('../../config/config.json')


//Auth Router
router.get('/',(req, res)=>{
   res.json({msg: "Admin..."})
})



module.exports = router