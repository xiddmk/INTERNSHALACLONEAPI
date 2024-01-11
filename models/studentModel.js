const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentModel = new mongoose.Schema(
    {

        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please fill a valid email address',
            ],
        },

        password: {
            type: String,
            select: false,
            maxlength: [15, "Password can not exceed more than 15 characters"],
            minlength: [6, "Password should have 6 characters"],
        },

        resetPasswordToken: {
            type: String,
            default: "0",
        },


        firstname: {
            type: String,
            required: [true, "First Name is required"],
            minlength: [4, "First name should be atleast 4 character long"]
        },

        lastname: {
            type: String,
            required: [true, "Last Name is required"],
            minlength: [4, "Last name should be atleast 4 character long"]
        },

        avatar: {
            type:Object,
            default:{
                fileId:'',
                url:"https://images.unsplash.com/photo-1704044843056-f58d8c147f88?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D",
            }
        },

        contact: {
            type: String,
            required: [true, "Contact is required"],
            maxlength: [10, "Contact should be atleast 10 character long"],
            minlength: [4, "Contact should be atleast min 4 character"]
        },

        city: {
            type: String,
            required: [true, "City Name is required"],
            minlength: [3, "City name should be atleast 3 character long"]
        },

        gender: {
            type:String, 
            enum:["Male","Female","Others"]
        },

        resume: {
            education:[],
            jobs:[],
            internships:[],
            reponsibilities:[],
            courses:[],
            projects:[],
            skills:[],
            
            accomplishments:[],
        },


        jobs: [
            {type:mongoose.Schema.Types.ObjectId,ref:"jobs"}

        ],
        internships: [
            {type:mongoose.Schema.Types.ObjectId,ref:"internships"}
        ],



    },
    { timestamps: true }
);

studentModel.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        let salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
        next();
    } catch (err) {
        return next(err);
    }
});

studentModel.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


studentModel.methods.getjwttoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const Student = mongoose.model("Student", studentModel);

module.exports = Student;
