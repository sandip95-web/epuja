const express = require('express');
const app = express();
const mongoose= require('mongoose');
const dotenv= require('dotenv');
const apiRouter = require('./router/product');
const userRouter= require('./router/user');
const orderRouter= require("./router/order");
const cookieParser = require('cookie-parser');
const cors = require('cors');
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(apiRouter);
app.use(userRouter);
app.use(orderRouter);



mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
    console.log('MONGO CONNECTED');
}).catch((e)=>{
    console.log("message: ",e);
})


app.listen(process.env.PORT,"0.0.0.0",()=>{
    console.log("Connected successfully");
});