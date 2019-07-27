const HttpStatus = require('http-status-codes');
const dateFormat = require('dateformat');

const User = require('../models/user');
const Email = require('../../lib/email');
const {signToken} = require('../helpers/auth');
const {find} = require('../helpers/dbHelper');
const strings = require("../../config/strings");
const http = require('https');
module.exports = {

        test: async (req, res, next) => {
           test1 = []
         var options = {
          host: "reqres.in",
          path: '/api/users?name=morpheus&job=leader',
          method: 'POST'
        };

         await http.request(options,  function(res) {
         console.log('d');
        
            test1.push('jjg');
console.log(test1);
           res.on('data', function (chunk) {
              this.test1 = chunk
            console.log('BODY: ' + chunk);
          });

        }).end();
         console.log(test1)
        res.header('Content-Type', 'application/json').status(HttpStatus.OK).json({user: test1});

    },

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
        newUser.projects=[]
        await newUser.save();
        // Email.activate_email(first_name,email,"Test");
        const token = await signToken(newUser);
         const data = {"user": newUser,"token":token};
        var resp = {status:1,message: strings.SIGNUP_SUCCESS,data:data}
        res.status(HttpStatus.OK).json(resp);

    },

    signIn: async (req, res, next) => {

        const {email, password} = req.value.body;

        let findUser = null;

         await find(User, {email: email}, null, async (error, data) => {
            findUser = data[0];

             if (!findUser) {
                 return res.status(HttpStatus.OK).json({status:0,errors: strings.INVALID_EMAIL})
             }

             let isMatch =  findUser.validPassword(password);

             if (!isMatch) {
                 return res.status(HttpStatus.OK).json({status:0,errors: strings.INVALID_PASSWORD});

             } else {

                 const token =  await  signToken(findUser);
                 const data = {"user": findUser,"token":token};
                 var resp = {status:1,message: strings.SIGNIN_SUCCESS,data:data};
                 //Email send to User
                 //  email.activate_email();
                 res.header('Content-type', 'application/json').status(HttpStatus.OK).json(resp);

             }
        });

    },

    changePassword: async (req, res, next) => {
        const {email, password, newpassword} = req.value.body;

        let findUser = null;

        await find(User, {email: email}, null, (error, data) => {
            findUser = data[0];
        });

        if (!findUser) {
            return res.status(HttpStatus.OK).json({error: strings.INVALID_EMAIL})
        }

        let isMatch = await findUser.validPassword(password);

        if (!isMatch) {
            return res.status(HttpStatus.OK).json({error: strings.INVALID_OLD_PASSWORD});

        } else {
            findUser.password = await findUser.generateHash(newpassword);
            findUser.save();
            const token = await signToken(findUser);
            //Email send to User
            //  email.activate_email();
            res.header('Content-Type', 'application/json').status(HttpStatus.OK).json({message: strings.PASSWORD_CHNG_SUCCESS});

        }
    },

    forgotPassword: async (req, res, next) => {
        const {email} = req.body;
        let findUser = null;

        await find(User, {email: email}, null, (error, data) => {
            findUser = data[0];
        });

        if (!findUser) {
            return res.status(HttpStatus.OK).json({error: strings.INVALID_EMAIL})
        }

        // Send email using active hash link
        //email.activate_email();

        res.header('Content-Type', 'application/json').status(HttpStatus.OK).json({message: strings.ACTIVE_EMAIL_SENT});
    },

    edit: async (req, res, next) => {
        res.status(200).json({message: "Called Secret method"});
    },

    profile: async (req, res, next) => {

        let userid = req.user.sub;
        let findUser = null;

        await find(User, {_id: userid}, null, (error, data) => {
            findUser = data[0];
        });
        res.header('Content-Type', 'application/json').status(HttpStatus.OK).json({user: findUser});
    },

    async test1(){
        console.log('sd');
    }

}
