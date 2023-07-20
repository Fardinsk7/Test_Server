const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');
const ProductModel = require("./model/Products")
require("dotenv").config()
mongoose.set("strictQuery", false);

const app = express()
const port = process.env.PORT || 7000;
app.use(cors());

const connecttoMongo = async ()=>{
    await mongoose.connect(`${process.env.MONGO_URL}`)
    console.log("Connect Mongodb Successfully")
}

app.use(express.json())
app.use("/",(req,res)=>{
    connecttoMongo()
    .then(async()=>{
        try {
            const data = await ProductModel.find();
            res.status(200).send(data);
            
            
        } catch (error) {
            console.log(error)
            res.status(500).json({mesage:"Server Error"})
        }
    }).catch((err)=>{
        res.send(err)
    })
})

app.listen(port, (err) => {
    if(err){console.log(err)}
    connecttoMongo()
    .then(()=>{
        console.log(`Server listening on port ${port}`)

    })
    .catch((err)=>{
        console.log(err)
    })
})