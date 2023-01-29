const mongoose=require('mongoose');
const db=require('../config/db.js');
const bookschema=new mongoose.Schema({
    title:{
        type:String,
        default:"----"
    },
    isbn:{
        type:Number,
    },
    author:{
        type:String,
        default:"----"
    }
});

const bookmodel=db.model('books',bookschema);

module.exports=bookmodel;



