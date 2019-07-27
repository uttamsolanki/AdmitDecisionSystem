const router = require('express-promise-router')();
const {validateBody, schemas} = require('../app/helpers/routerHelper');
const UserController = require('../app/controllers/user');
const {auth} = require('../app/helpers/auth');

router.route("/signup")
    .post(validateBody(schemas.authSchema), auth, UserController.signUp);

router.route("/signin")
    .post(validateBody(schemas.authSchema), UserController.signIn);


module.exports = router;