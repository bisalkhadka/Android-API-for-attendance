const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const AttendanceSchema = new mongoose.Schema({

    rnumber: { // column name
        type: Number   //data type String
    },

        stdimage: { // column name
            type: String   //data type String
        }
        // name: { // column name
        //     type: String   //data type String
        // },
        // p_id: { // column name
        //     type: String  //data type String
        // },
        // a_id: { // column name
        //     type: String   //data type String
        // },
       
    })

   
  

            
        
        const Attendance= mongoose.model('Attendance',AttendanceSchema)
    

    module.exports = Attendance 
 