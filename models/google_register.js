const mongoose =require('mongoose');

const Google_Register= mongoose.model('google_registers', new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    googleID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
})
);

module.exports.Google_Register= Google_Register;