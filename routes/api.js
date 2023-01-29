const router=require('express').Router();
const bookmodel=require('../model/book_model');


router.get('/books',async function (req,res){
    const bookList=await bookmodel.find();
    console.log(bookList);
    res.send(bookList);
}.catch(function(error){console.log("THE ERROR IS:",error)}));


router.get('/books/:id',async function(req,res){
    const {id}=req.params;
    const book=await bookmodel.findOne({isbn:id});
    if(!book) res.send("Book Not Found");
    res.send(book);
}.catch(function(error){console.log("THE ERROR IS:",error)}));

router.post('/books',async function(req,res){
    const title=req.body.title;
    const isbn=req.body.isbn;
    const author=req.body.author;
    const bookExist=await bookmodel.findOne({isbn:isbn});
    if(bookExist) return res.send('Book already exist');
    var data= await bookmodel.create({title,isbn,author});
    data.save();

    res.send("Book Uploaded");
}.catch(function(error){console.log("THE ERROR IS:",error)}));

router.put('/books/:id',async function(req,res){
    const {id}=req.params;
    const {
        title,
        author,
    }=req.body;

    const bookExist=await bookmodel.findOne({isbn:id});
    if(!bookExist) return res.send("Book Do Not Exist");

    const updateField=(val,prev)=>!val?prev:val;

    const updatedBook={
        ...bookExist,
        title:updateField(title, bookExist.title),
        authors:updateField(author,bookExist.author),
    };
    await bookmodel.updateOne({isbn:id},{$set:{title:updatedBook.title,author:updatedBook.author}})
    res.status(200).send("Book Updated");
}.catch(function(error){console.log("THE ERROR IS:",error)}));


router.delete('/books/:id',async function(req,res){
    const {id}=req.params;

    const bookExist=await bookmodel.findOne({isbn:id});
    if(!bookExist) return res.send("Book does not exist");

    await bookmodel.deleteOne({isbn:id})
        .then(function(){
        console.log("Data deleted");
        res.send("Book record deleted successfully");
        })
        .catch(function(error){
        console.log("error")});
    }.catch(function(error){console.log("THE ERROR IS:",error)}));


    module.exports=router;




