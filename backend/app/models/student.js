const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//fname, lname ,email ,contact, country,high_degree,high_dtype,high_degree_score,high_degree_stype,uwid,uw_degree_type,uw_score,uw_stype
// Create a Schema
const projectSchema = new Schema({
    fname: {type: String, required: true},
    lname:{type: String, required: true},
    email:{type: String, required: true},
    contact:{type: String, required: true},
    country:{type: String, required: true},
    high_degree:{type: String, required: true},
    high_dtype:{type: String, required: true},
    high_degree_score:{type: String, required: true},
    high_degree_stype:{type: String, required: true},
    uwid:{type: String, required: true},
    uw_degree_type:{type: String, required: true},
    uw_score:{type: String, required: true},
    uw_stype:{type: String, required: true},
    created_date: Date,
    updated_date: Date,
});


// Create a Model
const Project = mongoose.model('project', projectSchema);

// Export The Model
module.exports = Project
