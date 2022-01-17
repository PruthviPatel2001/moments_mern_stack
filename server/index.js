import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js'


const app = express();
dotenv.config();

// add pre-fix posts to all routes in posts.js file 



app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors())

app.use('/posts',postRoutes)

app.get('/',(req,res)=>{
      res.send("hello moments api")
})



// const CONNECTION_URL= "mongodb+srv://pruthvi:pruthvi@cluster0.eq1o9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology:true})
      .then(()=> app.listen( PORT,()=>
       console.log(`Server running on POrt: ${PORT}`
       )))
       .catch((e)=> console.log(e))

