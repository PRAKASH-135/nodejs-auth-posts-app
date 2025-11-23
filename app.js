// Core Imports
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const multerconfig = require('./config/multer')
const path = require("path");

// Models
const usermodel = require('./models/user');
const postmodel = require("./models/post");

const app = express();

// Middleware
app.set("view engine" ,'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public"))); 
app.use(cookieParser());

// ---------------------- Page Routes ----------------------
app.get('/', (req,res) => {
    res.render("index");
});

app.get("/profile/upload",(req,res)=>
{
    res.render('profileupload');
})

app.get('/login', (req,res) => {
    res.render("login");
});

app.get('/profile', isloggedin, async (req,res) => {
    let user = await usermodel.findOne({ email: req.user.email }).populate("posts");
    res.render("profile", { user });
});

app.get('/edit/:id', isloggedin, async (req,res) => {
    let post = await postmodel.findOne({ _id: req.params.id }).populate("user");
    res.render("edit", { post });
});

// ---------------------- Auth APIs ----------------------

app.post("/upload" , isloggedin, multerconfig.single("image") ,async(req,res)=>
{
    let user = await usermodel.findOne({email: req.user.email});
    user.profilepic = req.file.filename;
    await user.save();
    res.redirect("/profile")
})

app.post("/login", async (req,res) => {
    let { email, password } = req.body;
    let user = await usermodel.findOne({ email });
    if(!user) return res.status(400).send("User not found");

    bcrypt.compare(password, user.password, (err, result) => {
        if(result){
            let token = jwt.sign({ email, userid: user._id }, "sh");
            res.cookie("token", token);
            return res.redirect("/profile");
        } 
        return res.redirect("/login");
    });
});

app.post('/register', async (req,res) => { 
    let { name, age, email, password } = req.body;

    let user = await usermodel.findOne({ email });
    if(user) return res.status(500).send("User already registered");

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let newUser = await usermodel.create({
                name, age, email, password: hash
            });

            let token = jwt.sign({ email, userid: newUser._id }, "sh");
            res.cookie("token", token);
            return res.redirect("/profile");
        });
    });
});

app.get("/logout", (req,res) => {
    res.clearCookie("token");
    res.redirect("/login");
});

// ---------------------- Post APIs ----------------------
app.post('/post', isloggedin, async (req,res) => {
    let user = await usermodel.findOne({ email: req.user.email });
    let { content } = req.body;

    let post = await postmodel.create({
        user: user._id,
        content
    });

    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
});

app.get('/like/:id', isloggedin, async (req,res) => {
    let post = await postmodel.findOne({ _id: req.params.id }).populate("user");

    if(post.likes.indexOf(req.user.userid) === -1) {
        post.likes.push(req.user.userid);
    } else {
        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    }

    await post.save();
    res.redirect("/profile");
});

app.post('/update/:id', isloggedin, async (req,res) => {
    await postmodel.findOneAndUpdate(
        { _id: req.params.id }, 
        { content: req.body.content }
    );
    res.redirect("/profile");
});

// Test Route
app.get("/yt", isloggedin, (req,res) => {
    res.send("kadkade");
});

// ---------------------- Middleware ----------------------
function isloggedin(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.redirect("/login");

    try {
        let data = jwt.verify(token, "sh");
        req.user = data;
        next();
    } catch (err) {
        return res.redirect("/login");
    }
}

app.listen(3000);
