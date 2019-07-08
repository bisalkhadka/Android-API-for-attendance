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


//delete student
it('testing student delete', async () => {
    const status = await Student.deleteOne({name:'Ashim Rai'});
    expect(status.ok).toBe(1);
 });


