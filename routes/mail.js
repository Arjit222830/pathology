const express= require('express');
const router= express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req,res)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: req.body.from,
            pass: req.body.password
        }
    });
    
    var mailOptions = {
        from: req.body.from,
        to: req.body.to,
        subject: 'Mail Verification',
        text: req.body.text,
        attachments: [
            {
                filename: req.body.name, 
                path: `C:\\Users\\VISHWAS\\Desktop\\${req.body.name}`,                                        
                contentType: 'application/pdf'
            }]
    };

    transporter.sendMail(mailOptions, async(error, info)=>{
        if (error) 
            return res.status(400).send(error);

        res.status(200).send({message:"Email sent to "+mailOptions.to});
    });
});

module.exports= router;