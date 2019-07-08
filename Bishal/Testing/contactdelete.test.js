const Contact = require('../model/Contact');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/Contactdetailstest';
beforeAll(async () => {
   await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true
   });
});
afterAll(async () => {
   await mongoose.connection.close();
});

//delete contact
it('testing contact delete', async () => {
    const status = await Contact.deleteOne({Name:'Chris'});
    expect(status.ok).toBe(1);
 });