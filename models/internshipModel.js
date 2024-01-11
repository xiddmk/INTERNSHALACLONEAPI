const mongoose = require("mongoose");

const intershipModel = new mongoose.Schema(
    {
        students: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }],
        employe: { type: mongoose.Schema.Types.ObjectId, ref: "employe" },
        profile: String,
        skills: String,
        internshipType: { type: String, enum: ["In office", "Remote"] },
        openings: Number,
        from: String,
        to: String,
        duration: String,
        location: String,
        responsibility: String, 
        stipend: {
            status: {
                type: String,
                enum: ["fixed", "Negotiable", "performance based", "Unpaid"],
            },
            amount: Number,
        },
        perks: String,
        assessment: String,  // Corrected typo: assesment to assessment
    },
    { timestamps: true }
);

const Internship = mongoose.model("Internship", intershipModel);  // Corrected typo: Intership to Internship

module.exports = Internship;
