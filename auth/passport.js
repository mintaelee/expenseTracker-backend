const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../routes/users/models/User');

const keys = process.env.SECRET_KEY;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload)
        User.findById(jwt_payload.id)
            .then( user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false)
            })
            .catch(err => console.log(err));
    }))

}