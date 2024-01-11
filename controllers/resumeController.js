const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require('uuid');

exports.resume = catchAsyncErrors(async (req, res, next) => {
    const { resume } = await Student.findById(req.id).exec();
    res.json({ message: "Secure resume page access!", resume });
});

// addeducation

exports.addeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Education added!" });
});

// editeducation

exports.editeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduindex = student.resume.education.findIndex(i => i.id === req.params.eduid);

    student.resume.education[eduindex] = {
        ...student.resume.education[eduindex],
        ...req.body,
    };

    await student.save();
    res.json({ message: "Education updated!" });
});


// deleteeducation

exports.deleteeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();

    const filterededu = student.resume.education.filter((i) => i.id !== req.params.eduid);

    student.resume.education = filterededu;
    await student.save();
    res.json({ message: "Education deleted!" });
});





// addjob
exports.addjob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.jobs.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Job added!" });
});


// editjob

exports.editjob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduindex = student.resume.jobs.findIndex(i => i.id === req.params.eduid);

    student.resume.jobs[eduindex] = {
        ...student.resume.jobs[eduindex],
        ...req.body,
    };

    await student.save();
    res.json({ message: "job updated!" });
});


// deletejob
exports.deletejob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();

    const filteredjob = student.resume.jobs.filter((i) => i.id !== req.params.eduid);

    student.resume.jobs = filteredjob;
    await student.save();
    res.json({ message: "job deleted!" });
});



// deleteintern,

// addintern
exports.addintern = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.internships.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "internships added!" });
});




// editintern
exports.editintern = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const internIndex = student.resume.internships.findIndex(i => i.id === req.params.eduid);

    student.resume.internships[internIndex] = {
        ...student.resume.internships[internIndex],
        ...req.body,
    };

    await student.save();
    res.json({ message: "Internship updated!" });
});



// deleteintern
exports.deleteintern = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();

    const filteredintern = student.resume.internships.filter((i) => i.id !== req.params.eduid);

    student.resume.internships = filteredintern;
    await student.save();
    res.json({ message: "deleteintern deleted!" });
});



// reponsibilities

// addreponsibilities
exports.addreponsibilities = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.reponsibilities.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "reponsibility added!" });
});




// editreponsibilities
exports.editreponsibilities = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const reponsibilitiesIndex = student.resume.reponsibilities.findIndex(i => i.id === req.params.eduid);

    student.resume.reponsibilities[reponsibilitiesIndex] = {
        ...student.resume.reponsibilities[reponsibilitiesIndex],
        ...req.body,
    };

    await student.save();
    res.json({ message: "reponsibility updated!" });
});



// deletereponsibilities
exports.deletereponsibilities = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();

    const filteredreponsibilities = student.resume.reponsibilities.filter((i) => i.id !== req.params.eduid);

    student.resume.reponsibilities = filteredreponsibilities;
    await student.save();
    res.json({ message: "reponsibility deleted!" });
});






// courses

// addcourses
exports.addcourses = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.courses.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "courses added!" });
});




// editcourses
exports.editcourses = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const coursesIndex = student.resume.courses.findIndex(i => i.id === req.params.eduid);

    student.resume.courses[coursesIndex] = {
        ...student.resume.courses[coursesIndex],
        ...req.body,
    };

    await student.save();
    res.json({ message: "courses updated!" });
});



// deletecourses
exports.deletecourses = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();

    const filteredcourses = student.resume.courses.filter((i) => i.id !== req.params.eduid);

    student.resume.courses = filteredcourses;
    await student.save();
    res.json({ message: "courses deleted!" });
});







// projects

// addprojects
exports.addprojects = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.projects.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "projects added!" });
});




// editprojects
exports.editprojects = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const projectsIndex = student.resume.projects.findIndex(i => i.id === req.params.eduid);

    student.resume.projects[projectsIndex] = {
        ...student.resume.projects[projectsIndex],
        ...req.body,
    };

    await student.save();
    res.json({ message: "projects updated!" });
});



// deleteprojects
exports.deleteprojects = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();

    const filteredprojects = student.resume.projects.filter((i) => i.id !== req.params.eduid);

    student.resume.projects = filteredprojects;
    await student.save();
    res.json({ message: "projects deleted!" });
});






// skills

// addpskills
exports.addskills = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.skills.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "skills added!" });
});




// editskills
exports.editskills = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const skillsIndex = student.resume.skills.findIndex(i => i.id === req.params.eduid);

    student.resume.skills[skillsIndex] = {
        ...student.resume.skills[skillsIndex],
        ...req.body,
    };

    await student.save();
    res.json({ message: "skills updated!" });
});



// deleteskills
exports.deleteskills = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();

    const filteredskills = student.resume.skills.filter((i) => i.id !== req.params.eduid);

    student.resume.skills = filteredskills;
    await student.save();
    res.json({ message: "delete-skills!" });
});






// accomplishments


// addaccomplishments
exports.addaccomplishments = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.accomplishments.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "accomplishments added!" });
});




// editaccomplishments
exports.editaccomplishments = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const accomplishmentsIndex = student.resume.accomplishments.findIndex(i => i.id === req.params.eduid);

    student.resume.accomplishments[accomplishmentsIndex] = {
        ...student.resume.accomplishments[accomplishmentsIndex],
        ...req.body,
    };

    await student.save();
    res.json({ message: "accomplishments updated!" });
});



// deleteaccomplishments
exports.deleteaccomplishments = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();

    const filteredaccomplishments = student.resume.accomplishments.filter((i) => i.id !== req.params.eduid);

    student.resume.accomplishments = filteredaccomplishments;
    await student.save();
    res.json({ message: "accomplishments deleted!" });
});



