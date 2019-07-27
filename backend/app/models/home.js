//app/models/user.js
//load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//define the schema for our user model
var userSchema = mongoose.Schema({
    _id: {type: Number, default: 1},
    name: String,
    mail: String,
    password: String,
    status: String,
    created_date: Date,
    updated_date: Date,
    active_hash: String,
    role_id: {type: Number, default: 2}
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.Login = function (parm) {
    return true;

}

module.exports = mongoose.model('ex_users', userSchema);