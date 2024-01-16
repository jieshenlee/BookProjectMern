import express, { request, response } from "express";
import {PORT, mongoDBURL} from "./configure.js"
import mongoose from "mongoose";
import { Book } from "./modules/bookModules.js";

const app = express();

app.use(express.json());

app.get('/', (request, response)=>{
    console.log(request)
    return response.status(234).send('Welcome to MERN ')
});

app.post('/book', async(request, response) =>{
    try {
        if(
            !request.body.title ||
            !request.body.aurthor ||
            !request.body.publishYear 
        ){
            return response.status(400).send({
                message: 'send all require fields: title, aurthor, publish year',
            });
        }
        const newBook = {
            title: request.body.title,
            aurthor: request.body.aurthor,
            publishYear: request.body.publishYear 
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
        
    } catch (error) {
        console.log(error.message)
        response.status(500).send({message:error.message});
    }

})

app.listen(PORT, ()=>{
    console.log(`App is listen to: ${PORT}`);
});

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('APp is connected to database');
    app.listen(PORT, ()=>{
        console.log(`App is listen to: ${PORT}`);
    });  
})
.catch((error)=>{
    console.log(error);
})