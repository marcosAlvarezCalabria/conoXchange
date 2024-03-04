const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true,"Email is required"],
            unique: true,
            trim: true,
            lowercase:true
        
        },
        password: {
            type: String,
            required: [true,"Password is required"],
            minLength: [6,"password needs at least 6 characters"]
        },
        username: {
            type: String,
            required: [true,"username is required"],
            unique: true,
            minLength: [3,"username needs at least 6 characters"],
            maxLength: [10,"username should have less than 10 characters "]
        }
    }
)
