const mongoose = require("mongoose");

const jobModel = new mongoose.Schema(
    {
        students: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }],
        employe: { type: mongoose.Schema.Types.ObjectId, ref: "employe" },
        title: String,
        skills: String,
        jobtype: { type: String, enum: ["In office", "Remote"] },
        openings: Number,
        discription: String,
        prefrence: String,
        salary: Number,
        perks: String,
        location: String,
        assessment: String,  
    },
    { timestamps: true }
);

const Job = mongoose.model("Job", jobModel);  

module.exports = Job;
