const express = require("express");
const { 
    homepage,
    currentemploye,
    employesignup,
    employesignin,
    employesignout,
    employesendmail,
    employeforgetlink,
    employeresetpassword,
    employeupdate,
    employeavatar,
    createinternship,
    readinternship,
    readsingleinternship,
    createjob,
    readjob,
    readsinglejob,
    deleteEmploye,
} = require("../controllers/employeController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

// Get /
router.get("/", isAuthenticated, homepage);

// // Get /employe/employe
router.get("/employe", isAuthenticated, currentemploye);

// Post /employe/signup
router.post("/signup", employesignup);

// // Post /employe/signin
router.post("/signin", employesignin);

// // Get /employe/signout
router.get("/signout", isAuthenticated, employesignout);

// // Post /employe/send-mail
router.post("/send-mail", employesendmail);

// // Get /employe/forgetpass/:employe id
router.get("/forgetpass/:id", employeforgetlink);

// // Post /employe/forgetpass/:employe id
router.post("/resetpass/:id", isAuthenticated, employeresetpassword);

// // Post /employe/update/:employe id
router.post("/update/:id", isAuthenticated, employeupdate);

// // Post /employe/avtar/:employe id
router.post("/avatar/:id", isAuthenticated, employeavatar);






// ---------------Internship-----------------


// Post /internship/create/
router.post("/internship/create", isAuthenticated, createinternship);


router.post("/internship/read", isAuthenticated, readinternship);


router.post("/internship/read/:id", isAuthenticated, readsingleinternship);



// ---------------Jobs-----------------


// Post /job/create/
router.post("/job/create", isAuthenticated, createjob);


router.post("/job/read", isAuthenticated, readjob);


router.post("/job/read/:id", isAuthenticated, readsinglejob);




// delete current employe
// // Get /employe/employe
router.get("/employe/delete", isAuthenticated, deleteEmploye);





module.exports = router;
