const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeModel = new mongoose.Schema(
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

        organizationlogo: {
            type: Object,
            default: {
                fileId: '',
                url: "https://images.unsplash.com/photo-1704044843056-f58d8c147f88?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D",
            }
        },
        organizationname: {
            type: String,
            required: [true, "Organization Name is required"],
            minlength: [4, "First name should be atleast 4 character long"]
        },

        contact: {
            type: String,
            required: [true, "Contact is required"],
            maxlength: [10, "Contact should be atleast 10 character long"],
            minlength: [4, "Contact should be atleast min 4 character"]
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

employeModel.pre("save", function (next) {
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

employeModel.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


employeModel.methods.getjwttoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const Employe = mongoose.model("Employe", employeModel);

module.exports = Employe;
