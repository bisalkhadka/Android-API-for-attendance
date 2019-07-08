const Attendance = require('../model/Attendance');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/Attendancedatatest';
beforeAll(async () => {
   await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true
   });
});
afterAll(async () => {
   await mongoose.connection.close();
});

describe('Attendance System testing of saving attendance data', () => {
   var id='';
   // adding attendance data
   it('Attendance register testing', () => {
      const attendance = {
         rnumber: '1',
    
      };

      return Attendance.create(attendance)
         .then((attendance) => {
            id=attendance._id;
            expect(attendance.rnumber).toEqual('1');
         });
   });

   //update attendance details 
   it('updateattendancedata testing', () => {
     
      const dataup = {
         
         rclass: 'five'
      }
      console.log(id)
      return Attendance.findByIdAndUpdate(id,dataup,{ new: true })
         .then((dataup) => {
            expect(dataup.rclass).toEqual('five');
         });
   });

    //user delete testing
    //   it('testing user delete', async () => {
    //      const status = await User.deleteMany({usertype:'User'});
    //      expect(status.ok).toBe(1);
    //   });
    
   });

      
