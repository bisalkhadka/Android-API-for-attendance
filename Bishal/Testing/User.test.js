const User = require('../model/User');
 const mongoose = require('mongoose');
 const url = 'mongodb://localhost:27017/Testing'; // use the new name of the database 
 
beforeAll(async () => {  
       await mongoose.connect(url, {         
           useNewUrlParser: true, 
        useCreateIndex: true     }); }); 
 
afterAll(async () => { 
 
    await mongoose.connection.close(); }); 
 
describe('User  Schema test', () => {    
     it('Add User testing', () => {         
         const user = {  
             'Firstname': 'Bishal',
             'Lastname' : 'Khadka' , 
             'Email' : 'bisal11@gmail.com' ,
             'Username': 'Bisal' ,  
             'Address' : 'KTM'   ,
             'Module' : 'Science',
             'Password' : 'softwarica',
             'Confpassword' : 'softwarica'
             };                  
             return User.create(user)             
             .then((users) => {                 
                 expect(users.Firstname).toEqual('Bishal'); 
                 expect(users.Lastname).toEqual('Khadka');  
                 expect(users.Email).toEqual('bisal11@gmail.com');  
                 expect(users.Username).toEqual('Bisal');  
                 expect(users.Address).toEqual('KTM');  
                 expect(users.Module).toEqual('Science');  
                 expect(users.Password).toEqual('softwarica');  
                 expect(users.Confpassword).toEqual('softwarica');             
                 });
                     }); 


                      //update user
        it('to test the update', async () => {

            return User.findOneAndUpdate({ _id: Object('5d1a02854206b00fc0420b3d') },
                { $set: { Username: 'bisal' } }).then((users) => {
                    expect(users.Username).toEqual('Bishal')
                })
        });



        it('to test the delete product is working or not', async () => {
        const status = await Product.deleteMany();  
        expect(status.ok).toBe(1); });     
        
        
        
    });
 
    



