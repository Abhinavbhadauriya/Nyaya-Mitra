const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require("express-ejs-layouts"); // <--- add this
const methodoverride=require("method-override");
const dotenv = require("dotenv");
dotenv.config();
const session = require('express-session');

// Middleware
app.use(expressLayouts);  // <--- enable layouts
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "./layouts/boilerplate"); // default layout
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
app.use(express.json()); // middleware to parse JSON

//user authentication
const passport=require('passport')
const LocalStrategy=require('passport-local')
const user=require('./models/user')
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

//store currentuser
app.use((req,res,next)=>{
  res.locals.currUser=req.user;
  next();
})

// MongoDB connection
const mongourl = "mongodb://127.0.0.1:27017/nayamitra";
async function main() {
  await mongoose.connect(mongourl);
}
main()
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.log("DB connection error:", e));

// Routes
const lawRoutes = require("./routes/law");
app.use("/laws", lawRoutes);

const faqRoutes = require("./routes/faq");
app.use("/faqs", faqRoutes);

const streamRoutes = require("./routes/liveStreaming");
app.use("/streams", streamRoutes);

const trafficRoutes = require("./routes/traffic");
app.use("/traffic", trafficRoutes);

const epaymentRoutes = require("./routes/epayment");
app.use("/epayment", epaymentRoutes);

const courtfeeRoutes = require("./routes/courtfee");
app.use("/courtfee", courtfeeRoutes);

const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

// Root
app.get("/", (req, res) => {
  res.send("Welcome");
});

// Server
app.listen(8080, () => console.log("Running on Port 8080"));
