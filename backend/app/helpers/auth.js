const JWT = require('jsonwebtoken');
const {JWT_SECRET} = require('../../config/constants');
const HttpStatus = require('http-status-codes')
const strings = require('../../config/strings')
const User = require('../models/user');
const {find} = require('../helpers/dbHelper');
module.exports = {
    signToken: async (user) => {
        return JWT.sign({
            iss: 'CodeWork',
            sub: user._id,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1)
        }, JWT_SECRET);
    },

    auth: async (req, res, next) => {
        const token = req.header('authorization');
        if (!token) return res.status(HttpStatus.UNAUTHORIZED).json({'message': strings.UNATHORIZED_USER})
        try {
            const decode = JWT.verify(token, JWT_SECRET);
            req.user = decode;
            var findUser;

            await find(User, {_id: req.user.sub}, null, (error, data) => {
                findUser = data[0];
                if (!findUser) {
                    return res.status(HttpStatus.BAD_REQUEST).json({status:0,errors: strings.BAD_REQUEST})
                }
                next();
            });

        } catch (ex) {
            res.status(HttpStatus.BAD_REQUEST).json({'message': strings.BAD_REQUEST})
        }

    },

}
