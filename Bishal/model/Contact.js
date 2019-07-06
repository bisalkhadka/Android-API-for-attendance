const mongoose = require('mongoose');
const ContactSchema = new mongoose.Schema({


        Name: { // column name
            type: String   //data type String
        },
        Email: { // column name
            type: String   //data type String
        },
        Country: { // column name
            type: String   //data type String
        },
        Phone: { // column name
            type: String   //data type String
        },
        Message: { // column name
            type: String   //data type String
        }
       
    })
    
        
 const Contact= mongoose.model('Contact',ContactSchema)
    
module.exports = Contact 
 