const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            require: true,
        },
        email: {
            type: String,
            unique: true,
            require: true,
        },
        phone: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
    },
    {
        timestamp: true,
    }
)
const users = mongoose.model('users', userSchema)
module.exports = users
