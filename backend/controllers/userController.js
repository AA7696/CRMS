const User = require('../models/usermodel.js')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const getUser = async (req,res) =>{
    try {
        const token = req.headers.authorization.split(' ')[1]
         jwt.verify(token, process.env.ACCESS_TOKEN, async (err,decoded) =>{
            if(err){
                return res.status(403).send("Invalid token")
            }
            console.log(decoded);
            
            const user = await User.findById(decoded._id)
            if(!user){
                return res.status(404).send("User not found")
            }
            res.status(200).send(user)

         })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({mes: error})
        
    }
}
module.exports = {getUser};