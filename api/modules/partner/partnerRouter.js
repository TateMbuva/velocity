
const router = require('express').Router()
const partnerService = require('./partnerService')
//const emailTemplate = require('./passwordResetTemplate')
const config = require('../../config/config.json')

//Dependancies
const nodemailer = require('nodemailer')
const passwordGen = require('generate-password')

//Auth Router
router.get('/',(req, res)=>{
   res.json({msg: "Auth..."})
})

// Routes
//Add Event
router.post('/addEvent', (req, res, next)=> {
    console.log('event : ');
    console.log(req.body);
	partnerService.addEvent(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Something went wrong...' }))
        .catch(err => next(err));

})

// Routes
//Add Event
router.post('/allEvents', (req, res, next)=> {
    console.log('all events : ');
    console.log(req.body.userId);
    partnerService.allEvents(req.body.userId)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'tf...' }))
        .catch(err => next(err));

})


//get all Events
router.get('/getAllEvents', (req, res, next)=> {
    
    partnerService.getAllEvents()
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'tf...' }))
        .catch(err => next(err));

})


//join Event 
router.post('/joinEvent', (req, res, next)=> {
    
    console.log(req.body);

    partnerService.joinEvents(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'tf...' }))
        .catch(err => next(err));

})





module.exports = router

