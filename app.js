const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require("express-ejs-layouts"); 
const methodoverride=require("method-override");
const dotenv = require("dotenv");
dotenv.config();
const session = require('express-session');
const flash = require("connect-flash");

// Middleware
app.use(expressLayouts);  
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "./layouts/boilerplate"); // default layout
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
app.use(express.json()); // middleware to parse JSON
app.use(flash());

//user authentication
const passport=require('passport')
const LocalStrategy=require('passport-local')
const user=require('./models/user')
const member=require('./models/member')
app.use(session({
  secret: process.env.SECRET,  
  resave: false,
  saveUninitialized: false,
  cookie :{
    expires : Date.now()+30*24*60*60*1000,
    maxAge:30*24*60*60*1000,
    httpOnly:true,
    signed:true
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  
  next();
});
passport.use("userLocal", new LocalStrategy(user.authenticate()));
passport.use("memberLocal", new LocalStrategy(member.authenticate()));

passport.serializeUser((user, done) => {
  done(null, { id: user.id, role: user.role });
});

passport.deserializeUser((obj, done) => {
  if (obj.role === "Admin") {
    user.findById(obj.id).then(user => done(null, user));
  } else if (obj.role === "Member") {
    member.findById(obj.id).then(member => done(null, member));
  } 
});

const client = require("./twilio");

app.get('/otp', async (req, res) => {
  try {
    const { mobileNumber } = req.query;

    if (!mobileNumber) {
      return res.json({
        success: false,
        message: "Mobile number is required"
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    
    req.session.otp = otp;
    req.session.otpTime = Date.now();

    
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE,
      to: `+91${mobileNumber}`
    });

    return res.json({
      success: true,
      message: "✅ OTP sent successfully"
    });

  } catch (error) {
    console.error("Twilio Error:", error.message);

    return res.json({
      success: false,
      message: "Failed to send OTP, OTP Send Only Twilio Registerd user"
    });
  }
});



//store currentuser
app.use((req,res,next)=>{
  res.locals.currUser=req.user|| req.member;
  
  next();
})

// MongoDB connection
const mongourl =process.env.MONGOURL
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

const memberRoutes=require("./routes/member")
app.use("/member",memberRoutes);

const userRoutes = require("./routes/user");
const { isLogin } = require("./middleware");
app.use("/user", userRoutes);

app.use(express.static(path.join(__dirname, "public")));

// Root
app.get("/NyayaMitra", (req, res) => {
  res.render("home.ejs");
});

app.get("/Admin",isLogin,(req,res)=>{
  res.render('AdminDashboard.ejs');
})

app.get("/member",isLogin,(req,res)=>{
  res.render('memberDashboard.ejs');
})

// Server
app.listen(8080, () => console.log("Running on Port 8080"));
