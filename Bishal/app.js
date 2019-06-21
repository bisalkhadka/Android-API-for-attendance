
const express = require('express');
const cors = require('cors');
const fs= require('fs')
const bodyParser = require('body-parser');
const auth = require('./middleware/auth') 
const mongoose = require('./db/database')
const app = express();
 
app.use(cors());

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
    var mydata = new User(req.body);

    mydata.save().then(function () {
        //alert(Success)
        res.send('Login Successful');
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

    const user = await User.checkCrediantialsDb(req.body.username,req.body.password)
  // console.log(user)
    const token = await user.generateAuthToken()
    res.send({token})
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
   app.post('/users/logoutAll', auth, async (req, res) => {
    try {
    req.user.tokens = []
    await req.user.save()
    res.send()
    } catch (e) {
    res.status(500).send()
    }
   }) 


   app.put('/updateprofile',auth, function (req, res) {   //update producte
    console.log(req.body);
    User.findByIdAndUpdate(req.user._id, req.body, { new: true }, (err, user) => {
      res.send("succesfull");
    });
  });








app.listen(4444);
