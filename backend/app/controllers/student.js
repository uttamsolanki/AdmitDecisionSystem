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
        // let day = dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss");
        // const {name, desc} = req.body;
        // let findUser = null;
        //
        // await find(User, {_id: req.user.sub}, null, (error, data) => {
        //     findUser = data[0];
        // });


        var rep = await successResponse(null,"Project Saved Successfully",{test:req.params.id})
        return res.header('Content-type', 'application/json').status(HttpStatus.OK).json(rep);

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
    get: async (req, res, next) => {


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

    getProjectDetails: async (req, res, next) => {

        let project_id = req.body.project_id;
        let project = {};

        // await find(Project, {_id: project_id}, null, (error, data) => {
        //     project = data;
        // });

         Project.find({_id: project_id})
           .populate('scenario') // works
            .exec(function (err, scenario){
               let respData =[];
               if(!err){
                   respData=scenario[0]
               }
                 var resp = {status:1,message: 'Project list ',data:respData};
                 res.json(resp);
            });

        var resp = {status:1,message: 'Projects list ',data:project};
        //res.header('Content-Type', 'application/json').status(HttpStatus.OK).json(resp);
    },
    getScenarioDetails:async (req, res, next) => {

        let s_id = req.body.s_id;
        let project = {};

        // await find(Project, {_id: project_id}, null, (error, data) => {
        //     project = data;
        // });
        Scenario.find({_id: s_id}).exec(function (err, scenario){
                let respData =[];
                if(!err){
                    respData=scenario[0]
                }
                var resp = {status:1,message: 'Scenario Details ',data:respData};
                res.json(resp);
            });



        //res.header('Content-Type', 'application/json').status(HttpStatus.OK).json(resp);
    },

}
