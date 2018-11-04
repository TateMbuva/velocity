const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, unique: true, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: false },
    mobileNumber: { type: String, required: true },
    company: { type: String, default: "No company provided" },
    userType: { type: String, default: "memberPaid" },
    emailVerified: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);