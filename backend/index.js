import express from 'express';
import mongoose from 'mongoose'
import {PORT, URL} from './config.js'
import bookRoutes from './routes/bookRoutes.js';
import cors from 'cors'
const app= express();

app.use(express.json());

app.use(cors());

app.get('/',(req,res)=>{  
    console.log(req);
    return res.status(234).send('Welcome to connection');
  })
// app.use(
//     cors({
//         origin:'https://localhost:3000',
//         methods:['GET','POST','DELETE','UPDATE'],
//         allowedHeaders:['Content-Type'],
//     })
// )

app.use('/books',bookRoutes);


mongoose.connect(URL).then(()=>{
console.log("App is connected to database");
app.listen(PORT,()=>{
    console.log(`App is running on this PORT: ${PORT}`)
    })
}).catch((error)=>{
    console.log(error);
})
//change kiye hai