const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({

        Firstname: { // column name
            type: String   //data type String
        },
        Lastname: { // column name
            type: String   //data type String
        },
        Email: { // column name
            type: String  //data type String
        },
        Username: { // column name
            type: String   //data type String
        },
        Address: {  // column name
            type: String  //data type Number
        },
        Modulename: {  // column name
            type: String  //data type Number
        },
        Password: {  // column name
            type: String  //data type Number
        },
        Confpassword: {  // column name
            type: String  //data type Number
        },
        tokens:[{token: {type:String}}]
       
    })

   
        userSchema.statics.checkCrediantialsDb = async (user22, pass) =>{

            const user1 = await user.findOne({username : user22, password : pass})
             return user1;
    }

            userSchema.methods.generateAuthToken = async function () {
                const user = this
               const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
               
               console.log(token);
                user.tokens = user.tokens.concat({ token :token })
                await user.save()
                return token
               }
        
        const user= mongoose.model('user',userSchema)
    

    module.exports = user 
    //User is const name