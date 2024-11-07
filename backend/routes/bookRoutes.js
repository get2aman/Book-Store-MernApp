import express from "express"
import { Book } from "../model/bookModel.js";
const router =express.Router();
//get all book data
router.get('/',async (req,res)=>{
    try {
        const books= await Book.find({})
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//get book by id
router.get('/:id',async (req,res)=>{
    try {
        const {id}= req.params;
        const books= await Book.findById(id)
        return res.status(200).json({books})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//add a book in database
router.post('/',async(req,res)=>{
try {
    const data=req.body
    const newBook= new Book(data);
    const response = await newBook.save();
    res.status(200).json({response:response})
} catch (error) {
    console.log(error.message)
    res.status(500).send({message: error.message})
}
})

//update a book by id 
router.put('/:id',async (req,res)=>{
    try {
        const {id}= req.params;
        const updateBook= req.body;
        const response= await Book.findByIdAndUpdate(id,updateBook);
        if(!response){
            return res.status(404).json({message:'Book is not found'})
        }
       return res.status(200).send({message:'Book updated successfully'});
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//Delete a book by ID
router.delete('/:id',async (req,res)=>{
    try {
        const {id}= req.params;
        
        const response= await Book.findByIdAndDelete(id);
        if(!response){
            return res.status(404).json({message:'Book is not found'})
        }
       return res.status(200).send({message:'Book Delete successfully'});
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

export default router;