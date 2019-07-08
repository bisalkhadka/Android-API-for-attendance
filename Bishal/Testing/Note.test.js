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

describe('Attendance System note add testing', () => {
   var id='';
   // adding a note 
   it('Note register testing', () => {
      const note = {
         notename: 'first',
      };

      return Notes.create(note)
         .then((note_res) => {
            id=note_res._id;
            expect(note_res.notename).toEqual('first');
         });
   });

   //update a note 
   it('updatenote testing', () => {
     
      const noteup = {
         notedata: 'second'
      }
      console.log(id)
      return Notes.findByIdAndUpdate(id,noteup,{ new: true })
         .then((noteup) => {
            expect(noteup.notedata).toEqual('second');
         });
   });
   });

      
