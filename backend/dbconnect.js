const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const  mongoURI = process.env.MONGO_URI;

module.exports= dbconnect = ()=>{
mongoose
.connect(mongoURI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

}


