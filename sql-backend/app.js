const express = require('express')
const authrouter = require('./routes/authRoute.js')
const userRouter = require('./routes/userRoute.js')
const contactrouter = require('./routes/contactRoute.js')
const cors = require('cors')
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./db/db.js');


//middlewares
app.use(cors());
app.use(bodyParser.json());

// app.use(express.urlencoded({ extended: true }));





// Sync database
sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Error syncing database:', err));

    app.use('/api/auth', authrouter);
    app.use('/api/users', userRouter);
    app.use('/api/contacts', contactrouter);

const PORT =  3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));