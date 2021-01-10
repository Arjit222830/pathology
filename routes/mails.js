const express= require('express');
const router= express.Router();
const {Mail}= require('../models/mail');
const formidable= require('formidable');
const nodemailer = require('nodemailer');
const fs= require('fs');


router.get('/:id',async(req,res)=>{
  const mail = await Mail.find({ _id: req.params.id })
  if (mail[0].pdf.data) {
    res.set("Content-Type", mail[0].pdf.contentType);
    return res.send(mail[0].pdf.data);
}

   res.send("not found")
});

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
      const { name,email, token} = fields;
    console.log(fields);

    if (!name && !email && !token) {
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
    mail.save(async(err, mail) => {
      if (err) {
        res.status(400).json({
          error: "Saving product in DB failed",
        });
      }

      await gmail(email,token,"Your lab report has arrived");

      res.redirect("/");
    });
  });

});

router.post('/update/:id', async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    //destructure the fields

    const { name,email, token } = fields;

    if (!name && !email && !token) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let mail = await Mail.findByIdAndUpdate(req.params.id, {email,token}, {new: true,});

    if (!mail) 
      return res.status(404).send("Given ID was not found"); //404 is error not found

    console.log("go"+file.pdf.size);
    //handle file here
    if (file.pdf.size!=0) {
      if (file.pdf.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!",
        });
      }
      mail.pdf.data = fs.readFileSync(file.pdf.path);
      mail.pdf.contentType = file.pdf.type;
    }


    //save to the DB
    mail.save(async(err, mail) => {
      if (err) {
        res.status(400).json({
          error: "Saving product in DB failed",
        });
      }

      await gmail(email,token,"Your lab report has been updated")

      res.redirect("/");
    });
  });
});

router.post('/delete/:id', async (req,res) => {
  const mail = await Mail.findByIdAndRemove(req.params.id);
  if (!mail) 
    return res.status(404).send("Given ID was not found"); //404 is error not found

  res.redirect("/");
});

const gmail= async(email,token,text)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'arjitbhandari0762@gmail.com',
        pass: 'Arjit222830@'
    }
  });

  var mailOptions = {
      from: 'arjitbhandari0762@gmail.com',
      to: 'arjitbhandari222830@gmail.com',
      subject: 'Bhandari Path Lab & Diagnosis Center',
      text: `${text}. Your token is ${token}. Visit bhandaripathlabs.in to take your report.`
  };

  await transporter.sendMail(mailOptions);
}

module.exports= router;