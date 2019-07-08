const Student = require('../model/Student');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/Studenttest';
beforeAll(async () => {
   await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true
   });
});
afterAll(async () => {
   await mongoose.connection.close();
});

describe('Attendance System students add testing', () => {
   var id='';
   // adding studentdetails
   it('Student register testing', () => {
      const student = {
          stdimage: 'Student.jpg' ,
          name: 'Ashim Rai' ,
          age: '12' ,
         address: 'Hetauda',
         fname: 'Ram Rai' ,
         mname: 'Sita Rai' ,
         rnumber: '1' ,
         rclass: 'one' ,
         pnumber: '9834567811'

  
      };

      return Student.create(student)
         .then((student_res) => {
            id=student_res._id;
            expect(student_res.address).toEqual('Hetauda');
         });
   });

   //updating student details
   it('updatestudent testing', () => {
     
      const studentup = {
         
         rclass: 'two'
      }
      console.log(id)
      return Student.findByIdAndUpdate(id,studentup,{ new: true })
         .then((studentup) => {
            expect(studentup.rclass).toEqual('two');
         });
   });
    
   });

      
