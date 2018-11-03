
const router = require('express').Router()
const authService = require('./authService');

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

	authService.create(req.body)
        .then(() => res.json({ message: "User registered..."}))
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

