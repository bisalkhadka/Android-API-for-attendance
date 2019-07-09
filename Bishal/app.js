
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
app.use(express.static(path.join(__dirname,'profile')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 



const User = require('./model/User');
const Student = require('./model/Student');
const Notes = require('./model/Notes');
const Attendance = require('./model/Attendance');
const Contact = require('./model/Contact');




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
        'Module': req.body.Module,
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

app.get('/users/:id', function (req, res) {
    uid=req.params.id.toString();
    User.findById(uid).then(function (user) {
        res.send(user);
    }).catch(function (e) {
        res.send(e)
    });

});

app.get('/contacts', function (req, res) {
    Contact.find().then(function (contact) {
        res.send(contact);
    }).catch(function (e) {
        res.send(e)
    });

});

app.get('/contacts/:id', function (req, res) {
    uid=req.params.id.toString();
    Contact.findById(uid).then(function (contact) {
        res.send(contact);
    }).catch(function (e) {
        res.send(e)
    });

});

app.delete('/contactdelete/:id',function(req,res){
    uid=req.params.id.toString();
    Contact.findByIdAndDelete(uid).then(function(){
        res.send({message:"success"})
    })
  })




app.delete('/userdelete/:id',function(req,res){
    uid=req.params.id.toString();
    User.findByIdAndDelete(uid).then(function(){
        res.send({message:"success"})
    })
  })

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
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|PNG|png|gif)$/)) {
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

// To add contact page //

app.post('/contact', (req, res) => {
    console.log(req.body);
    var mydata = new Contact(req.body);
    mydata.save().then(function (data) {
        //alert(Success)
        res.send(data);
 }).catch(function (e) {
      res.send(e);
    

    });
});

//===================================//===================================//========================================//
 
// To update Profile //

   app.put('/profileupdate',auth, function (req, res) {   //update product
    console.log(req.body);
    User.findByIdAndUpdate(req.body.id, req.body, { new: true }, (err, notes) => {
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


  app.put('/updatenote', function (req, res) {   //update note
    console.log(req.body);
    Notes.findByIdAndUpdate(req.body.id, req.body, { new: true }, (err, notes) => {
      res.send("Note Updated succesfully");
    });
  });


//=====================================//==============================//============================================//

// To Save attendance 


app.post('/addattendance', (req, res) => {
    //console.log(req.body);
    var data=req.body.stringOfArray;
    data.forEach(element => {
        console.log(element)
        var myData = new Attendance(element);
        myData.save();
    });
    res.json("success")
    
});

app.put('/updatestudent', function (req, res) {   //update student
    console.log(req.body);
    Student.findByIdAndUpdate(req.body.id, req.body, { new: true }, (err, student) => {
      res.send("Profile Updated succesfully");
    });
  });


app.get('/onestudents/:id', function (req, res) {
   
    uid=req.params.id.toString();
 
    Student.find({rclass:uid}).then(function (student) {
        console.log(student)
        res.json({
            studt:student.map(stud=>{
                return{
                    name:stud.name,
                    stdimage:stud.stdimage,
                    rnumber:stud.rnumber,
                    rclass:stud.rclass

                }
            })
        });
    }).catch(function (e) {                        
        res.send(e)
    });

});


app.get('/detailstudents/:id', function (req, res) {
    uid=req.params.id.toString();
    Student.find({rclass:uid}).then(function (student) {
        console.log(student)
        res.send(student)
    }).catch(function (e) {                        
        res.send(e)
    });
});


// app.get('/reportdetails', function (req, res) {
//     Attendance.find().then(function (attendance) {

//         res.send(attendance);
//     }).catch(function (e) {
//         res.send(e)
//     });

// });


app.get('/onestudents/:id', function (req, res) {
    uid=req.params.id.toString();
    Student.find({rclass:uid}).then(function (student) {
        console.log(student)
        res.json({
            studt:student.map(stud=>{
                return{
                    name:stud.name,
                    stdimage:stud.stdimage,
                    rnumber:stud.rnumber,
                    rclass:stud.rclass
                }
            })
        });
    }).catch(function (e) {                        
        res.send(e)
    });
});



app.get('/reportdetails/:id', function (req, res) {
    uid=req.params.id.toString();
    Attendance.find({rclass:uid}).then(function (attendance) {
        console.log(attendance)
        res.json({
            attd:attendance.map(attd=>{
                return{
                    date:attd.date,
                    _id:attd._id
                }
            })
        });
    }).catch(function (e) {                        
        res.send(e)
    });
});

app.get('/attendancedetails/:id', function (req, res) {
    uid=req.params.id.toString();
    Attendance.find({_id:uid}).then(function (attendance) {
        console.log(attendance)
        res.json({
            atd:attendance.map(atd=>{
                return{
                    rnumber:atd.rnumber, 
                    name:atd.name,  
                    present:atd.present,  
                    absent:atd.absent  
                }
            })
        });
    }).catch(function (e) {                        
        res.send(e)
    });
});


app.delete('/attendancedelete/:id',function(req,res){
    uid=req.params.id.toString();
    Attendance.findByIdAndDelete(uid).then(function(){
        res.send({message:"success"})
    })
  })






app.post('/approval/:id', (req, res) => {
    console.log(req.body);
    var mydata = new Approve({status:"Approval Request", userid:req.user._id});
    mydata.save().then(function (data) {
        //alert(Success)
        res.send(data);
 }).catch(function (e) {
      res.send(e);
    

    });
});



app.put('/userapprove/:id', function (req,res){
    uid=req.params.id.toString();
    console.log(uid);
    Approve.findByIdAndUpdate(uid, { $set: { status:"request approved"}}, {new:true },(err,info) => {
        res.send("fine");
    })
})








app.listen(4444);
