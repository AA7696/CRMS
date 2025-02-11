const express = require('express')
const connectDb = require('./db/db.js')
const authrouter = require('./routes/authRoute.js')
const userRouter = require('./routes/userRoute.js')
const contactrouter = require('./routes/contactRoute.js')
const cors = require('cors')
require('dotenv').config();
const app = express();

//middlewares
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authrouter);
app.use('/api/users', userRouter);
app.use('/api/contacts', contactrouter);













const start = async() =>{
    try {
        await connectDb(process.env.MONGODB_URI)
        app.listen(3000, () => console.log('Server is running on port 3000'))
      
    } catch (error) {
        console.log(error);
        
    }
}

start();

