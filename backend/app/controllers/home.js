var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
var userModel = require('../models/home');
exports.loggedIn = function(req, res, next)
{
    if (req.session.user) { // req.session.passport._id

        next();

    } else {

        res.redirect('/login');

    }

}

exports.home = function(req, res) {


    res.render('home.ejs', {
        error : req.flash("error"),
        success: req.flash("success"),
        session:req.session,

    });

}


exports.signup = function(req, res) {

    var newUser            = new userModel();

    var day =dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss");

    newUser.mail    = email;
    newUser.password = newUser.generateHash(password);
    newUser.name = req.body.username;
    newUser.created_date = day;
    newUser.updated_date = day;
    newUser.status = 'active'; //inactive for email actiavators
    newUser.active_hash = "$2a$10$YpQ/7khcx8FGDZ.h71.cZuQMnVdIvIvm/Fiuw.YvOOMK9vWstIzKC";

    if(newUser.save()){
        res.status(200).json({
            message: newUser
        })
    }
}


exports.login = function(req, res) {
    let user = {
        email :req.body.email,
        password :req.body.password
    }

    userModel.findOne({ 'mail' :  user.email }, function(err, user) {
        res.status(200).json({
            message: user
        })

    });



}


    
