const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserScehma = new Schema({
    username :{
        type : String,
        required : true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createadAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("User", UserScehma);