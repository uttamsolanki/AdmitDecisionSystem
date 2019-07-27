const router = require('express-promise-router')();
const {validateBody, schemas} = require('../app/helpers/routerHelper');
const UserController = require('../app/controllers/user');
const {auth} = require('../app/helpers/auth');

router.route("/test")
    .post(UserController.test);

router.route("/signup")
    .post(validateBody(schemas.authSchema), UserController.signUp);

router.route("/signin")
    .post(validateBody(schemas.signIn), UserController.signIn);

router.route("/changePassword")
    .post(validateBody(schemas.changePassword), UserController.changePassword);

router.route("/forgotPassword")
    .post(validateBody(schemas.forgotPassword), UserController.forgotPassword);

router.route("/profile")
    .post(auth, UserController.profile);

module.exports = router;
