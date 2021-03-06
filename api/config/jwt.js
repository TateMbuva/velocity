const expressJwt = require('express-jwt');
const config = require('./config.json');
const auth = require('../modules/auth/authService');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/auth/authenticate',
            '/auth/register',
            '/partner/allEvents',
            '/partner/addEvent',
            '/partner/getAllEvents',
            '/partner/joinEvent'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await auth.getById(payload.sub);
    
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};