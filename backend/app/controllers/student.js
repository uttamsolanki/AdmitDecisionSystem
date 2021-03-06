const HttpStatus = require('http-status-codes');
const dateFormat = require('dateformat');

const User = require('../models/user');
const Student = require('../models/student');
const Email = require('../../lib/email');
const {signToken} = require('../helpers/auth');
const {find} = require('../helpers/dbHelper');
const {failureResponse , successResponse} = require('../helpers/common');
const strings = require("../../config/strings");

module.exports = {

    signUp: async (req, res, next) => {

        const {first_name, email, password, last_name} = req.value.body;

        const findUser = await User.findOne({email: email});
        if (findUser) {
            return res.status(HttpStatus.FORBIDDEN).json({status:0,error: strings.EMAIL_IN_USER})
        }

        let newUser = new User();

        let day = dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss");

        newUser.first_name = first_name;
        newUser.last_name = last_name;
        newUser.email = email;
        newUser.password = await newUser.generateHash(password);
        newUser.created_date = day;
        newUser.updated_date = day;
       // await newUser.save();
        // Email.activate_email(first_name,email,"Test");
        const token = await signToken(newUser);
         const data = {"user": newUser,"token":token};
        var resp = {status:1,message: strings.SIGNUP_SUCCESS,data:data}
        res.status(HttpStatus.OK).json(resp);

    },

    edit:async (req, res, next)=>{
        const {fname, lname ,email ,contact, country,high_degree,high_dtype,high_degree_score,high_degree_stype,uwid,uw_degree_type,uw_score,uw_stype} = req.body;

        Student.findOne({_id:req.params.id})
            .exec( async function (err, student){

                let day = dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss");
                student.fname = fname;
                student.lname = lname;
                student.email = email;
                student.contact = contact;
                student.country = country;
                student.high_degree = high_degree;
                student.high_dtype = high_dtype;
                student.high_degree_score = high_degree_score;
                student.high_degree_stype = high_degree_stype;
                student.uwid = uwid;
                student.uw_degree_type = uw_degree_type;
                student.uw_score = uw_score;
                student.uw_stype = uw_stype;
                student.updated_date = day;
                student.save();

                if(student.save()) {
                    var rep = await successResponse(1,"Student data has been updated",{data:student})
                } else{
                    var rep = await successResponse(0,"Student data not updated",{data:student})
                }

                return res.header('Content-type', 'application/json').status(HttpStatus.OK).json(rep);
            });


    },
    save: async (req, res, next) => {
        
        const {fname, lname ,email ,contact, country,high_degree,high_dtype,high_degree_score,high_degree_stype,uwid,uw_degree_type,uw_score,uw_stype} = req.body;

        let day = dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss");

        let newStudent = new Student();
        newStudent.fname = fname;
        newStudent.lname = lname;
        newStudent.email = email;
        newStudent.contact = contact;
        newStudent.country = country;
        newStudent.high_degree = high_degree;
        newStudent.high_dtype = high_dtype;
        newStudent.high_degree_score = high_degree_score;
        newStudent.high_degree_stype = high_degree_stype;
        newStudent.uwid = uwid;
        newStudent.uw_degree_type = uw_degree_type;
        newStudent.uw_score = uw_score;
        newStudent.uw_stype = uw_stype;
        newStudent.created_date = day;
        newStudent.updated_date = day;
        await newStudent.save();

        var rep = await successResponse(null,"Project  succussfully",newStudent)
        return res.header('Content-type', 'application/json').status(HttpStatus.OK).json(rep);
        },
    all: async (req, res, next) => {


        Student.find({})
            .exec(function (err, result){
               // console.log(result);
                if(result) {
                    var resp = {status: 1, message: 'Student list', data: result};
                } else{
                    var resp = {status:1,message: 'Student list',data:result};
                }
                res.json(resp);
            });
    },
    get: async (req, res, next) => {


        Student.find({_id:req.params.id})
            .exec(function (err, result){
                // console.log(result);
                if(result) {
                    var resp = {status: 1, message: 'Student list', data: result};
                } else{
                    var resp = {status:1,message: 'Student list',data:result};
                }
                res.json(resp);
            });
    },
    delete: async (req, res, next) => {

        Student.remove({ _id: req.params.id }, function(err) {
            if (!err) {
                var resp = {status:1,message: 'Student Deleted Successfully',data:{id:req.params.id}};
            }
            else {
                var resp = {status:1,message: 'Something Wrong',data:[]};
            }
            res.json(resp);
        });

        // Scenario.findByIdAndDelete(s_id)
        //     .exec(function (err, result){
        //         console.log(result);
        //         if(result[0] !== undefined)
        //             var resp = {status:1,message: 'Projects list',data:result[0].projects};
        //         else{
        //             var resp = {status:1,message: 'Projects list',data:[]};
        //         }
        //         res.json(resp);
        //     });
    },

    uni: async (req, res, next) => {


        Student.find({}).select('high_degree -_id').distinct('high_degree',function (err, result){
                // console.log(result);
                if(result) {
                    var resp = {status: 1, message: 'University list', data: result};
                } else{
                    var resp = {status:1,message: 'University list',data:result};
                }
                res.json(resp);
            });
        //res.header('Content-Type', 'application/json').status(HttpStatus.OK).json(resp);
    },
    studentByUni:async (req, res, next) => {
      const{uni} = req.body;
        Student.find({high_degree:uni})
            .exec(function (err, result){
                // console.log(result);
                if(result) {
                    var resp = {status: 1, message: 'Student list', data: result};
                } else{
                    var resp = {status:1,message: 'Student list',data:result};
                }
                res.json(resp);
            });
        //res.header('Content-Type', 'application/json').status(HttpStatus.OK).json(resp);
    },

}
