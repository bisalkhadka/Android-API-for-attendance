const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const StudentSchema = new mongoose.Schema({

    stdimage: { // column name
        type: String   //data type String
    },

        name: { // column name
            type: String   //data type String
        },
        age: { // column name
            type: Number   //data type String
        },
        address: { // column name
            type: String  //data type String
        },
        fname: { // column name
            type: String   //data type String
        },
        mname: {  // column name
            type: String  //data type Number
        },
        rnumber: {  // column name
            type: Number  //data type Number
        },
        rclass: {  // column name
            type: String  //data type Number
        },
        pnumber: {  // column name
            type: String  //data type Number
        }
        
       
       
    })

   
  

            
        
        const Student= mongoose.model('Student',StudentSchema)
    

    module.exports = Student 
 