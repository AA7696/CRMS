const User = require('../models/usermodel.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const creatUser = async (req,res) =>{
    
    try {
        const {username, email, password} = req.body
        console.log(req.body);

        if(!(username && email && password)){
            return res.status(400).send("All fields are required")
        }

        const exsitedUser = await User.findOne({email})

        if(exsitedUser){
            return res.status(400).send("User already exists")
        }
        const encryptedPassword = await bcrypt.hash(password,4)

        const user = await User.create({
            username,
            email,
            password:encryptedPassword,
        
        })
        await user.save()
        return res.status(201).send("User created successfully")



    } catch (error) {
        return res.status(500).send({mes: error})
        
    }

}

const loginUser = async (req,res)=>{
    try {
        const {email, password} = req.body
        if(!(email && password)){
            return res.status(400).send("All fields are required")
        }
        const user = await User.findOne({email})
        if(user && (await bcrypt.compare(password, user.password))){
            const accessToken = user.generateAccessToken()
            const refreshToken = user.generateRefreshToken()
            user.refreshToken = refreshToken;
            await user.save();
            return res.status(200).send({accessToken, refreshToken})
           
        }else{
            return res.status(400).send("Invalid credentials")
        }

        
    } catch (error) {
        console.log(error);
       return res.status(500).send({mes: error}) 
    }
}

const refreshToken = async (req,res)=>{
    const {refreshToken} = req.body
    if(!refreshToken){
        return res.status(403).send("Access is forbidden")
    }
    try {
        const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN)
        const accessToken = user.getAccessToken()
        return res.status(200).send({accessToken})
        
    } catch (error) {
        return res.status(403).send("Invalid refresh token")
    }
}

module.exports = {creatUser, loginUser, refreshToken}