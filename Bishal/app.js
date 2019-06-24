
const express = require('express');
const cors = require('cors');
const fs= require('fs')
const bodyParser = require('body-parser');
const auth = require('./middleware/auth');
const mongoose = require('./db/database');
const multer = require('multer');
const path = require('path');
const app = express();
 
app.use(cors());
app.use('/images',express.static('./profile'))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 



const User = require('./model/User');



const middleware = require('./middleware/middleware');
 require('./db/database');
app.get("/test11", middleware, function(req, res){
    console.log("this should load after the middleware");
   
    })

app.use(bodyParser.urlencoded({ extended: false }));
app.post('/registration', (req, res) => {
    console.log(req.body);
    data={
        'fileToUpload': req.body.fileToUpload,
        'Firstname': req.body.Firstname,
        'Lastname': req.body.Lastname,
        'Email': req.body.Email,
        'Username': req.body.Username,
        'Address':req.body.Address,
        'Modulename': req.body.Modulename,
        'Password': req.body.Password,
        'Confpassword': req.body.Confpassword,
        'usertype':"user"
    }
    var mydata = new User(data);

    mydata.save().then(function (data) {
        //alert(Success)
        res.send(data);
 }).catch(function (e) {
      res.send(e);
    

    });
});

 

  



app.get('/users', function (req, res) {
    User.find().then(function (user) {
        res.send(user);
    }).catch(function (e) {
        res.send(e)
    });

});


app.post("/login10", async function(req, res){

    const user = await User.checkCrediantialsDb(req.body.Username,req.body.Password)
  // console.log(user)
    const token = await user.generateAuthToken()
    console.log(token)
    res.send({token:token,
    userdata:user}) 
   })


   //dashboard tokens client file
   app.get('/user/me',auth,function(req,res)
   {  
       res.send(req.user);
   })

app.post('/users/logout', auth, async (req, res) => {
    try {
        console.log( req.user.tokens);
    req.user.tokens = req.user.tokens.filter((token) => {
    return token.token !== req.token
    })
    await req.user.save()
    res.send()
    } catch (e) {
    res.status(500).send()
    }
   })


   var storage = multer.diskStorage({
    destination: 'profile',
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, 'User' + Date.now() + ext);
    }
});

var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 1000000 }
});


    app.post('/uploadImg', upload.single('imageFile'), (req, res) => {
       res.send(req.file)
        // res.statusCode = 200;
        // res.setHeader('Content-Type', 'application/json');
        // res.json(req.file);
    });

  


   app.put('/profileupdate',auth, function (req, res) {   //update product
    console.log(req.body);
    User.findByIdAndUpdate(req.user._id, req.body, { new: true }, (err, user) => {
      res.send("succesfull");
    });
  });








app.listen(4444);
