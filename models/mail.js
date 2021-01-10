const mongoose =require('mongoose');

const Mail= mongoose.model('mails', new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    pdf: {
        data: Buffer,
        contentType: String
    },
})
);

module.exports.Mail= Mail;