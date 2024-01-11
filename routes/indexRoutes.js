const express = require("express");
const {
    homepage,
    currentUser,
    studentsignup,
    studentsignin,
    studentsignout,
    studentsendmail,
    studentforgetlink,
    studentresetpassword,
    studentupdate,
    studentavatar,
    applyjob,
    applyinternship,
    deleteUser,

} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

// Get /user
router.get("/", isAuthenticated, homepage);

// Get /user/student
router.get("/student", isAuthenticated, currentUser);

// Post /user/student/signup
router.post("/student/signup", studentsignup);

// Post /user/student/signin
router.post("/student/signin", studentsignin);

// Get /user/student/signout
router.get("/student/signout", isAuthenticated, studentsignout);

// Post /user/student/send-mail
router.post("/student/send-mail", studentsendmail);

// Get /user/student/forgetpass/:student id
router.get("/student/forgetpass/:id", studentforgetlink);

// Post /user/student/forgetpass/:student id
router.post("/student/resetpass/:id", isAuthenticated, studentresetpassword);

// Post /user/student/update/:student id
router.post("/student/update/:id", isAuthenticated, studentupdate);

// Post /user/student/avtar/:student id
router.post("/student/avatar/:id", isAuthenticated, studentavatar);




//--------Apply Internship-----------

// Post /user/student/apply/internship/:internship id
router.post("/student/apply/internship/:internshipid", isAuthenticated, applyinternship);




//--------Apply Job------------

// Post /user/student/apply/job/:job id
router.post("/student/apply/job/:jobid", isAuthenticated, applyjob);


// delete current student
// Get /user/student
router.get("/student/delete", isAuthenticated, deleteUser);



module.exports = router;
