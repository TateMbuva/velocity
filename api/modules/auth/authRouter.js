
const router = require('express').Router()
const authService = require('./authService')
const emailTemplate = require('./passwordResetTemplate')
const config = require('../../config/config.json')

//Dependancies
const nodemailer = require('nodemailer')
const passwordGen = require('generate-password')

//Auth Router
router.get('/',(req, res)=>{
   res.json({msg: "Auth..."})
})

// Routes
//Authenticate User/Login
//email + password
router.post('/authenticate', (req, res, next)=> {

	authService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect...' }))
        .catch(err => next(err));

})
//Register User
// email + firstName + lastName + password
router.post('/register', (req, res, next)=> {
    let p = "no password"
    //Generate unique password if none Exists
    if(!req.body.password){
        p = passwordGen.generate({
        length: 10,
        numbers: true
        })
    }else {
        p = req.body.password
    }
    //New user object
    let newUser = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        mobileNumber: req.body.mobileNumber,
        company: req.body.company,
        password: p
    }

    

    console.log(newUser)
    

	authService.create(newUser)
        .then(() => {
            //process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
            // Mailer Setup
            //Transport/Source
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: config.transportEmail,
                  pass: config.emailPassword
                },
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false
                }
              })
            //Mailer Options
            const mailOptions = {
                from: `${config.transportEmail}`,
                to: `${req.body.email}`,
                subject: `Email Verification`,
                text: `Hello World`,
                html: emailTemplate(p),
                replyTo: `${config.transportEmail}`
              }
            console.log(mailOptions)
            //Send mail
            transporter.sendMail(mailOptions, function(err, r) {
                if (err) {
                  console.log('✉️  Nodemailer Error : ', err);
                  res.json({ message: "User registered but Password Reset Email NOT Sent"})
                } else {
                  res.json({ message: "User registered and Password Reset Email Sent"}) 
                  console.log('✉️  Nodemailer Response: ', r)
                }
              })  

            
        })
        .catch(err => next(err));

})
//Get all users
router.get('/', (req, res, next)=> {
	authService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));

})
//Get the currently logged in user
router.get('/current', (req, res, next)=> {

	authService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));

})
//Get user by id
//url param "?id=______"
router.get('/:id', (req, res, next)=> {

	authService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));

})
//Update user fields
//url param "?id=______"
// + fields to be changed
router.put('/:id', (req, res, next)=> {

	authService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));

})
//Delete user by id
//url param "?id=______"
router.delete('/:id', (req, res, next)=> {

	authService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));

})




module.exports = router

