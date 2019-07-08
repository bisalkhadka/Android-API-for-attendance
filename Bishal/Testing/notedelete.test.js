const Notes = require('../model/Notes');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/Notetest';
beforeAll(async () => {
   await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true
   });
});
afterAll(async () => {
   await mongoose.connection.close();
});

   
//delete note
it('testing note delete', async () => {
    const status = await Notes.deleteMany({notename:'first'} , {notedata:'second'});
    expect(status.ok).toBe(1);
 });

      
