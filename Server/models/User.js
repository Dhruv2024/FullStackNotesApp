const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notes",
    }],
    token: {
        type: String,
    },
    userImage: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("User", userSchema);