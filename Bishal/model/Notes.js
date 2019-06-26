const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const NoteSchema = new mongoose.Schema({


        notedata: { // column name
            type: String   //data type String
        },
        notename: { // column name
            type: String   //data type String
        }
       
    })
    
        
 const Note= mongoose.model('Note',NoteSchema)
    
module.exports = Note 
 