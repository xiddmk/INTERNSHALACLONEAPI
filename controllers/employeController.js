const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Employe = require("../models/employeModel");
const Job = require("../models/jobModel");
const Internship = require("../models/internshipModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const imagekit = require("../utils/imagekit").initimageKit()
const path = require("path")

exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "Secure Employe homepage!" });
});



exports.currentemploye = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
    res.json({ employe });
});



exports.employesignup = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe(req.body).save();
    sendtoken(employe, 201, res);
});




exports.employesignin = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please provide both email and password", 400));
    }

    const employe = await Employe.findOne({ email }).select("+password").exec();

    if (!employe) {
        return next(new ErrorHandler("User not found with this email address", 404));
    }

    try {
        const isMatch = await employe.comparePassword(password);

        if (!isMatch) {
            return next(new ErrorHandler("Wrong credentials", 401));
        }

        sendtoken(employe, 200, res);
    } catch (error) {
        return next(new ErrorHandler("Error comparing passwords", 500));
    }
});




exports.employesignout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token");
    res.json({ message: 'employe Successfully signed out' });
});



exports.employesendmail = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findOne({ email: req.body.email }).exec();

    if (!employe) {
        return next(new ErrorHandler("User not found with this email address", 404));
    }

    const url = `${req.protocol}://${req.get("host")}/student/forgetpass/${employe._id}`;
    sendmail(req, res, next, url);

    employe.resetPasswordToken = "1";
    await employe.save();

    res.json({ employe, url });
});




exports.employeforgetlink = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.params.id).exec();

    if (!employe)
        return next(new ErrorHandler("employe not found with thid email", 404))



    if (employe.resetPasswordToken == "1") {
        employe.resetPasswordToken = "0";
        employe.password = req.body.password;
        await employe.save()

    } else {
        return next(new ErrorHandler("invalid reset password token link", 500))
    }
    res.status(200).json({
        massage: "passwor has been changed"
    })


})



exports.employeresetpassword = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();

    employe.password = req.body.password;
    await employe.save();

    sendtoken(employe, 201, res);

})




exports.employeupdate = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findByIdAndUpdate(req.params.id, req.body).exec();

    res.status(200).json({
        success: true,
        message: "employe Updated successfully",
        employe,
    });
});




exports.employeavatar = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.params.id).exec();

    if (!employe) {
        return res.status(404).json({
            success: false,
            message: "Employee not found",
        });
    }

    const file = req.files.organizationlogo;
    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.filename)}`;

    if (employe.organizationlogo.fileId !== "") {
        await imagekit.deleteFile(employe.organizationlogo.fileId);
    }

    const { fileId, url } = await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName,
    });

    employe.organizationlogo = { fileId, url };

    await employe.save();

    res.status(200).json({
        success: true,
        message: "Employee profile updated",
    });
});


// ---------------Internship-----------------

exports.createinternship = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec(); // Changed req.id to req.body.employeeId
    const internship = await new Internship(req.body);
    internship.employe = employe._id;
    employe.internships.push(internship._id);
    await internship.save();
    await employe.save();
    res.status(201).json({ success: true, internship });
});







exports.readinternship = catchAsyncErrors(async (req, res, next) => {
    const { internships } = await Employe.findById(req.id).populate("internships").exec();
    res.status(200).json({ success: true, internships });
});




exports.readsingleinternship = catchAsyncErrors(async (req, res, next) => {
    const internship = await Internship.findById(req.params.id).exec();
    res.status(200).json({ success: true, internship });
});




// ---------------Jobs-----------------

exports.createjob = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec(); // Changed req.id to req.body.employeeId
    const job = await new Job(req.body);
    job.employe = employe._id;
    employe.jobs.push(job._id);
    await job.save();
    await employe.save();
    res.status(201).json({ success: true, job });
});


exports.readjob = catchAsyncErrors(async (req, res, next) => {
    const { jobs } = await Employe.findById(req.id).populate("jobs").exec();
    res.status(200).json({ success: true, jobs });
});


exports.readsinglejob = catchAsyncErrors(async (req, res, next) => {
    const job = await Job.findById(req.params.id).exec();
    res.status(200).json({ success: true, job });
});




// Delete employee
exports.deleteEmploye = catchAsyncErrors(async (req, res, next) => {
    try {
        const employe = await Employe.findByIdAndDelete(req.id).exec();

        if (!employe) {
            return res.status(404).json({ message: "Employe not found" });
        }

        res.json({ message: "Employe deleted", employe });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

