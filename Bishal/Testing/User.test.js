const User = require('../model/User');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/TestUserattendance';
beforeAll(async () => {
   await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true
   });
});
afterAll(async () => {
   await mongoose.connection.close();
});

describe('Attendance System User testing', () => {
   var id='';
   // adding a user
   it('User register testing', () => {
      const user = {
         Firstname: 'Vishal',
         Lastname: 'Khadka Chhetri',
         Email: 'bisalkhadka@gmail.com',
         Username: 'bisal',
         Address: 'Maitidevi chowk',
         Module: 'Science',
         Password: 'bisal',
         Confpassword:'bisal',
         usertype: 'user',
         fileToUpload: 'Student.jpg'
      };

      return User.create(user)
         .then((user_res) => {
            id=user_res._id;
            expect(user_res.Username).toEqual('bisal');
         });
   });

   //update user
   it('updateuser testing', () => {
     
      const userup = {
         
         Username: 'bishal1234'
      }
      console.log(id)
      return User.findByIdAndUpdate(id,userup,{ new: true })
         .then((userupd) => {
            expect(userupd.Username).toEqual('bishal1234');
         });
   });

  
    
   });

      
