const  express = require('express');
const dotenv = require('dotenv');
const dbconnect = require("./dbconnect");
const { router } = require('./routers/userrouters');
const cors = require('cors');



const app = express();
dotenv.config();
app.use(cors())
app.use(express.json());
dbconnect() 

port = process.env.PORT;


app.use("/api/auth",router)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

