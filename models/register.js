const Joi= require('@hapi/joi');
const mongoose =require('mongoose');

const Other_Members_Object= new mongoose.Schema({
    1:{
        type: String
    },
    2:{
        type: String
    },
    3:{
        type: String
    },
    4:{
        type: String
    }
});

const Register= mongoose.model('registrations', new mongoose.Schema({
    event_name:{
        type: String,
        required: true
    },
    team_name: {
        type: String,
        required: true
    },
    team_leader: {
        type: String,
        required: true
    },
    enroll_no: {
        type: String,
        required: true
    },
    total_members:{
        type: String,
        required: true
    },
    college_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true
    },
    Other_Members:{
        type: Other_Members_Object
    },
    transaction:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
);

function validateRegister(register){    
    const schema= {
        team_name: Joi.string().min(1).max(50).required(),
        team_leader: Joi.string().min(1).max(50).required(),
        enroll_no: Joi.string().required(),
        total_members: Joi.string().required(),
        college_name: Joi.string().min(1).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        contact: Joi.string().length(10).required(),
        member1: Joi.string(),
        member2: Joi.string(),
        member3: Joi.string(),
        member4: Joi.string(),
        transaction: Joi.string().required()
    };
    return Joi.validate(register, schema);
}

module.exports.Register= Register;
module.exports.validate=validateRegister;