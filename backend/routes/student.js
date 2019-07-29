const router = require('express-promise-router')();
const {validateBody, schemas} = require('../app/helpers/routerHelper');
const UserController = require('../app/controllers/user');
const StudentController = require('../app/controllers/student');
const {auth} = require('../app/helpers/auth');

router.route("/save")
    .post(StudentController.save);

router.route("/edit/:id")
    .put(StudentController.edit);




router.route("/university")
    .get(StudentController.uni);

router.route("/studentByUni")
    .post(StudentController.studentByUni);

router.route("/:id")
    .get(StudentController.get);

router.route("/")
    .get(StudentController.all);

router.route("/delete/:id")
    .delete(StudentController.delete);

module.exports = router;
