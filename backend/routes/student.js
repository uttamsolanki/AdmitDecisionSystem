const router = require('express-promise-router')();
const {validateBody, schemas} = require('../app/helpers/routerHelper');
const UserController = require('../app/controllers/user');
const StudentController = require('../app/controllers/student');
const {auth} = require('../app/helpers/auth');

router.route("/save")
    .post(StudentController.save);

router.route("/edit/:id")
    .put(StudentController.edit);

router.route("/")
    .get(StudentController.get);

router.route("/delete/:id")
    .delete(StudentController.delete);

module.exports = router;
