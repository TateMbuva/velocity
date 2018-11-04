const config = require('../../config/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../config/mongoose');
const Event = db.Event;


module.exports = {
    addEvent,
    allEvents,
    getAllEvents,
    joinEvent,
    
};

function addEvent(data) {
    
    return new Promise(async function(resolve, reject) {
        await Event.create(data, (err, createdProfile)=>{
            if(err){
                reject(err)
            }else{
                console.log(createdProfile)
                resolve(createdProfile)
            }

        })
    })
    
}
async function allEvents(userId) {
    console.log(userId);
     let events = await Event.find({ partnerId: userId });
     return events;
    
}

async function getAllEvents() {
    
     let events = await Event.find({});
     return events;
    
}

function joinEvent(data) {
    
    return new Promise(async function(resolve, reject) {
        await Event.findOneAndUpdate({_id: data.eventId}, {$push: {regUsers: data.user}})

    })
    
}