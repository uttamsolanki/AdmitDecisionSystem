const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const {JWT_SECRET} = require('./constants');
const User = require('../app/models/user');


// JSON Web Token  Strategy
passport.use(new JwtStrategy({
    jwtFromRequest :ExtractJwt.fromHeader('authorization'),
    secretOrKey:JWT_SECRET
},async (payload,done)=>{
    try{

        let user = await User.findById(payload.sub);
        
        if(!user){
            return done(null,false);
        }

        done(null,user);

    }catch(error){
        done(error,false);
    }

} ));

// Local Strategy

passport.use(new LocalStrategy({
    usernameField :'email',
},async(email,password,done)=>{
    try{

        let user = await User.findOne({ email });
            
            if(!user){
                return done(null,false);
            }

        let isMatch = await user.validPassword(password);

        if(!isMatch){
            return done(null,false,"Test");

        }

        done(null,user);

    }catch(error){
        done(error,false);
    }

}))