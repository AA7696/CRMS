const express = require('express')


const mongoose =require('mongoose')
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

// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('database_name', 'username', 'password', {
//   host: 'localhost',  // Agar aap local system use kar rahe hain
//   dialect: 'mysql',   // MySQL use kar rahe hain
//   logging: false      // Console me SQL queries show na ho, agar chahiye to `true` karein
// });

// sequelize.authenticate()
//   .then(() => console.log('✅ MySQL Database Connected'))
//   .catch(err => console.log('❌ MySQL Connection Error:', err));

// module.exports = sequelize;
