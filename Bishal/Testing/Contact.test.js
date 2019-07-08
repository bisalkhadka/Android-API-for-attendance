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

describe('Attendance System testing of adding a contact', () => {
   var id='';
   // adding contact details 
   it('Contact register testing', () => {
      const contact = {
         Name: 'Chris',
         Email: 'log45@gmail.com' ,
         Country: 'Canada' ,
         Phone: '3456789098765' ,
         Message: 'I would love to see certain changes in this system'
    
      };

      return Contact.create(contact)
         .then((contact_res) => {
            id=contact_res._id;
            expect(contact_res.Name).toEqual('Chris');
         });
   });

   //update contact details 
   it('updatecontact testing', () => {
     
      const contactup = {
         
         Country: 'Canada'
      }
      console.log(id)
      return Contact.findByIdAndUpdate(id,contactup,{ new: true })
         .then((contactup) => {
            expect(contactup.Country).toEqual('Canada');
         });
   });

    //user delete testing
    //   it('testing user delete', async () => {
    //      const status = await User.deleteMany({usertype:'User'});
    //      expect(status.ok).toBe(1);
    //   });
    
   });

      
