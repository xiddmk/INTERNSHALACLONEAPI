const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();
const {
    resume,
    addeducation,
    editeducation,
    deleteeducation,
    addjob,
    editjob,
    deletejob,
    addintern,
    editintern,
    deleteintern,
    addreponsibilities,
    editreponsibilities,
    deletereponsibilities,
    addcourses,
    editcourses,
    deletecourses,
    addprojects,
    editprojects,
    deleteprojects,
    addskills,
    editskills,
    deleteskills,
    addaccomplishments,
    editaccomplishments,
    deleteaccomplishments,
} = require("../controllers/resumeController");

// Get /resume
router.get("/", isAuthenticated, resume);


// RESUME FIELDS


// EDUCATION

// Post /add-edu
router.post("/add-edu", isAuthenticated, addeducation);

// Post /add-edu
router.post("/edit-edu/:eduid", isAuthenticated, editeducation);

// Post //delete-edu
router.post("/delete-edu/:eduid", isAuthenticated, deleteeducation);


// JOB

// Post /add-job
router.post("/add-job", isAuthenticated, addjob);

// Post /edit-job/:eduid
router.post("/edit-job/:eduid", isAuthenticated, editjob);

// Post //delete-job/:eduid
router.post("/delete-job/:eduid", isAuthenticated, deletejob);


// INTERNSHIPS

// Post /add-intern
router.post("/add-intern", isAuthenticated, addintern);

// Post /edit-intern
router.post("/edit-intern/:eduid", isAuthenticated, editintern);

// Post /delete-intern
router.post("/delete-intern/:eduid", isAuthenticated, deleteintern);



// reponsibilities

// Post /add-reponsibilities
router.post("/add-reponsibilities", isAuthenticated, addreponsibilities);

// Post /edit-reponsibilities/:eduid
router.post("/edit-reponsibilities/:eduid", isAuthenticated, editreponsibilities);

// Post /delete-reponsibilities/:eduid
router.post("/delete-reponsibilities/:eduid", isAuthenticated, deletereponsibilities);


// courses

// Post /add-courses
router.post("/add-courses", isAuthenticated, addcourses);

// Post /edit-courses/:eduid
router.post("/edit-courses/:eduid", isAuthenticated, editcourses);

// Post /delete-courses/:eduid
router.post("/delete-courses/:eduid", isAuthenticated, deletecourses);




// projects

// Post /add-projects
router.post("/add-projects", isAuthenticated, addprojects);

// Post /edit-projects/:eduid
router.post("/edit-projects/:eduid", isAuthenticated, editprojects);

// Post /delete-projects/:eduid
router.post("/delete-projects/:eduid", isAuthenticated, deleteprojects);





// skills

// Post /add-projects
router.post("/add-skills", isAuthenticated, addskills);

// Post /edit-projects/:eduid
router.post("/edit-skills/:eduid", isAuthenticated, editskills);

// Post /delete-projects/:eduid
router.post("/delete-skills/:eduid", isAuthenticated, deleteskills);


// accomplishments

// Post /add-projects
router.post("/add-accomplishments", isAuthenticated, addaccomplishments);

// Post /edit-projects/:eduid
router.post("/edit-accomplishments/:eduid", isAuthenticated, editaccomplishments);

// Post /delete-projects/:eduid
router.post("/delete-accomplishments/:eduid", isAuthenticated, deleteaccomplishments);



module.exports = router;