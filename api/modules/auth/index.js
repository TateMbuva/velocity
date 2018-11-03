
const router = require('express').Router()

//Auth Router
router.get('/',(req, res)=>{
   res.json({msg: "Auth..."})
})




module.exports = router

