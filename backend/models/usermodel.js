const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
        
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        
    }


}, {timestamps: true});

const generateToken = (payload, secret, expiresIn) => {
    try {
        return jwt.sign(payload, secret, { expiresIn });
    } catch (error) {
        throw new Error("Failed to generate token");
    }
};

UserSchema.methods.generateRefreshToken = function() {
    return generateToken(
        { _id: this._id, email: this.email }, // Include additional fields if needed
        process.env.REFRESH_TOKEN,
        '7d'
    );
};

UserSchema.methods.generateAccessToken = function() {
    return generateToken(
        { _id: this._id, email: this.email }, // Include additional fields if needed
        process.env.ACCESS_TOKEN,
        '15m' // Adjust expiry time as needed
    );
};
module.exports = mongoose.model('User', UserSchema);