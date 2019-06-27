
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
// app.use('/images',express.static('./profile'))

app.use(express.static(path.join(__dirname,'Student')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 



const User = require('./model/User');
const Student = require('./model/Student');
const Notes = require('./model/Notes');
const Attendance = require('./model/Attendance');



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

app.get('/students', function (req, res) {
    Student.find().then(function (student) {

        res.send(student);
    }).catch(function (e) {
        res.send(e)
    });

});

//==============================================//=============================================

// To get notes //

app.get('/notes', function (req, res) {
    Notes.find().then(function (notes) {

        res.send(notes);
    }).catch(function (e) {
        res.send(e)
    });

});


//--------------------==================================================================--------------//

// get one student //


app.get('/students/:id', function (req, res) {
    uid=req.params.id.toString();
    Student.findById(uid).then(function (student) {

        res.send(student);
    }).catch(function (e) {
        res.send(e)
    });

});

//---------------------------======================================---------------------------------------//


// get one note //


app.get('/notes/:id', function (req, res) {
    uid=req.params.id.toString();
    Notes.findById(uid).then(function (notes) {
        
        res.send(notes);
    }).catch(function (e) {
        res.send(e)
    });

});


//==================================================//===========================================================


// For login System //

app.post("/login10", async function(req, res){

    const user = await User.checkCrediantialsDb(req.body.Username,req.body.Password)
    const token = await user.generateAuthToken()
    console.log(token)
    res.send({token:token,
    userdata:user}) 
   })


   //==========================================//==========================================================//
   


   //dashboard tokens client file
   app.get('/user/me',auth,function(req,res)
   {  
       res.send(req.user);
   })

   //=================================================//==========================================

   //For logout //

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

//=====================================Image upload and retrieve =============================================//
  

var storage = multer.diskStorage({
    destination: 'profile',
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, 'User' + Date.now() + ext);
    }
});

var storage = multer.diskStorage({
    destination: 'Student',
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, 'Student' + Date.now() + ext);
    }
});


var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|png|gif)$/)) {
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

    app.post('/stdimage', upload.single('imageFile'), (req, res) => {
        res.send(req.file)
         // res.statusCode = 200;
         // res.setHeader('Content-Type', 'application/json');
         // res.json(req.file);
     });

 //=--------=============================  To add Student //================================================//

     app.post('/add', (req, res) => {
        console.log(req.body);
        var mydata = new Student(req.body);
        mydata.save().then(function (data) {
            //alert(Success)
            res.send(data);
     }).catch(function (e) {
          res.send(e);
        
    
        });
    });


    // -------------------------------//---------------------------------------------------// 

//===================================To add note ==============================================//


    app.post('/noteadd', (req, res) => {
        console.log(req.body);
        var mydata = new Notes(req.body);
        mydata.save().then(function (data) {
            //alert(Success)
            res.send(data);
     }).catch(function (e) {
          res.send(e);
        
    
        });
    });

   
//--------------------------------------------------//------------------------------------------------------
 
// To update Profile //

   app.put('/profileupdate',auth, function (req, res) {   //update product
    console.log(req.body);
    User.findByIdAndUpdate(req.user._id, req.body, { new: true }, (err, user) => {
      res.send("succesfull");
    });
  });

  //================================================//========================================================

  // To delete student by id //

  app.delete('/stddelete/:id',function(req,res){
    uid=req.params.id.toString();
    Student.findByIdAndDelete(uid).then(function(){
        res.send({message:"success"})
    })
  })


  //====================================================//============================================================

   // To delete note by id //

   app.delete('/notedelete/:id',function(req,res){
    uid=req.params.id.toString();
    Notes.findByIdAndDelete(uid).then(function(){
        res.send({message:"success"})
    })
  })

  //================================================//===================================================================

// To Save attendance 


app.post('/addattendance', (req, res) => {
    console.log(req.body);
    var mydata = new Attendance(req.body);
    mydata.save().then(function (data) {
        //alert(Success)
        res.send(data);
 }).catch(function (e) {
      res.send(e);
    

    });
});







app.listen(4444);
