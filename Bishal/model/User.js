const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({

    fileToUpload: { // column name
        type: String   //data type String
    },

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
        Module: {  // column name
            type: String  //data type Number
        },
        Password: {  // column name
            type: String  //data type Number
        },
        Confpassword: {  // column name
            type: String  //data type Number
        },
        usertype:{
            type: String
        },
        status:{
            type:String
        },
        tokens:[{token: {type:String}}]
       
    })

   
        userSchema.statics.checkCrediantialsDb = async (user22, pass) =>{

            const user1 = await user.findOne({Username : user22, Password : pass})
             return user1;
    }

            userSchema.methods.generateAuthToken = async function () {
                const user = this
               const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
               
               //console.log(token);
                user.tokens = user.tokens.concat({ token :token })
                await user.save()
                return token
               }
        
        const user= mongoose.model('user',userSchema)
    

    module.exports = user 
 