const express= require('express');
const router= express.Router();
const nodemailer = require('nodemailer');
const {Mail}= require('../models/mail');
const formidable= require('formidable');
const fs= require('fs');

router.get('/:id',async(req,res)=>{
  const mail = await Mail.find({ _id: req.params.id })
  if (mail[0].pdf.data) {
    res.set("Content-Type", mail[0].pdf.contentType);
    return res.send(mail[0].pdf.data);
  }
  res.send("not found")
})

router.post('/', async (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, async (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image",
        });
      }
      //destructure the fields
  
      const { email, token, pdf } = fields;
      console.log(fields);
  
      if (!email && !token) {
        return res.status(400).json({

          error: "Please include all fields",
        });
      }
  
      let mail = new Mail(fields);
  
      //handle file here
      if (file.pdf) {
        if (file.pdf.size > 300000) {
          return res.status(400).json({
            error: "File size too big!",
          });
        }
        mail.pdf.data = fs.readFileSync(file.pdf.path);
        mail.pdf.contentType = file.pdf.type;
      }
  
      //save to the DB
      mail.save((err, mail) => {
        if (err) {
          res.status(400).json({
            error: "Saving product in DB failed",
          });
        }
        res.redirect("/");
      });
    });

  });

module.exports= router;