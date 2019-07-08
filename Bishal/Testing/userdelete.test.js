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


//delete user
it('testing user delete', async () => {
    const status = await User.deleteMany({usertype:'user'});
    expect(status.ok).toBe(1);
 });


