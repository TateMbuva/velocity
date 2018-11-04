//Defaults
const config = require('./config.json');
//Dependencies
const mongoose = require('mongoose');

//Connect to DB
mongoose.connect(config.dbUrl)
.then(()=>{
	console.log("🤖  MongoDb Connection : Successful")
})
.catch((err)=>{
	console.log("🤖  MongoDb Connection : Failed \n Make sure mongodb is running")
})

//Register Mongoose Promise
mongoose.Promise = global.Promise;

//Export all models
module.exports = {
    User: require('../models/user.js'),
    UserProfile: require('../models/userProfile.js'),
    Event: require('../models/event.js')
};