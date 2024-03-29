require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();

// database connection
require("./models/database").connectDatabase();

// logger
const logger = require("morgan");
app.use(logger("tiny"));


// bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// session an cookie
const session = require("express-session");
const cookieparser = require("cookie-parser");

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.EXPRESS_SESSION_SECRET
}))

app.use(cookieparser())



// express fileupload
const fileupload = require("express-fileupload");
app.use(fileupload());


// routes
app.use("/user", require("./routes/indexRoutes"));
app.use("/resume", require("./routes/resumeRoutes"));
app.use("/employe", require("./routes/employeRoutes"));


// error handling
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedErrors } = require("./middlewares/error");
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Your Request URL Not Fount ${req.url}`, 404))
})
app.use(generatedErrors)


// this is our server port
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
