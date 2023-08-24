const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: String,
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]
}, {
    timestamps: true
})

const User = mongoose.model("User", usersSchema);
module.exports = User;