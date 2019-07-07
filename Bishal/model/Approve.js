const mongoose = require('mongoose');
const ApproveSchema = new mongoose.Schema({


        status: { // column name
            type: String   //data type String
        },
        userid: { // column name
            type: String 
        }
       
    })
    
        
 const Approve= mongoose.model('Approve',ApproveSchema)
    
module.exports = Approve 
 