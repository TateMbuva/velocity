const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    partnerId: { type: String, required: true },
    partnerCompany: { type: String, required: true },
    regUsers: { type: [Object], required: false },
    eventTitle: { type: String, required: false },
    eventInfo: { type: String, required: false },
    eventLocation: { type: String, required: false },
    eventDate: { type: Date, required: false },
    eventInfoNumber: { type: String, required: false },
    eventUrl: { type: String, required: false },
    eventEmail: { type: String, required: false },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Event', schema);