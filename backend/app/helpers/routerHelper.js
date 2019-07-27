const Joi = require('joi');

module.exports = {
    validateBody:(schema)=>{
        return (req,res,next) =>{
            const result = Joi.validate(req.body,schema);
            if(result.error){
                console.log(result.error.details);
                return res.status(400).json(result.error);
            }
            if(!req.value){ req.value ={}; }
            req.value['body'] = result.value;
            next();
        }
    },
    schemas:{
        authSchema :Joi.object().keys({
            first_name:Joi.string().required().label("First name"),
            last_name:Joi.string().label("Last name"),
            email:Joi.string().email().required().label("Email"),
            password:Joi.string().required(),
        }),

        signIn :Joi.object().keys({
            email:Joi.string().email().required().label("Email"),
            password:Joi.string().required(),
        }),

        changePassword :Joi.object().keys({
            email:Joi.string().email().required().label("Email"),
            password:Joi.string().required(),
            newpassword:Joi.string().required().label("New Password"),
        }),
        forgotPassword :Joi.object().keys({
            email:Joi.string().email().required().label("Email"),
        }),
    }
}
