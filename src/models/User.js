const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'Enter Your Name'],
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            require: [true, 'Enter Your Email']
        },
        password: {
            type: String,
            required: [true, 'Enter Your Password'],
            min: 6,
            max: 64
        },
    },
    {timestamps: true, versionKey:false}
)

const User = mongoose.model('User',userSchema);

module.exports = User;