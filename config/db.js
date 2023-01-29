const mongoose=require('mongoose');
var url='mongodb://localhost:5000/booksDB';
const connection=mongoose.createConnection(url);
module.exports=connection;
