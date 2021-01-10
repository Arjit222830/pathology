const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require('config');
const google_login = require('./routes/google_login');
const mail = require('./routes/mails');
const gets= require('./routes/get-request');
const {Mail}= require('./models/mail');

mongoose.connect(config.get('db'), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Connected to ${config.get('db')}...`))
    .catch(err => console.log(`Could not connect to ${config.get('db')}...`, err));

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use(express.json());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', gets);
app.use('/login-with-google', google_login);
app.use('/mail', mail);

require('./prod.js')(app);

app.set("view engine", "pug");

app.post('/admin', async function (req, res) {
    var flag=0;
    if(config.get('security')==req.body.security)
        flag=1;

    res.status(200).render('admin',{flag:flag,link:'/mail'});
});

app.post('/info',async(req,res)=>{
    const mails = await Mail.find()
    res.status(200).render("reports",{mails});
});

app.post('/admin-:id', async(req, res)=> {
    console.log(req.params.id[0]);
    const mail= await Mail.find({_id: req.params.id});
    res.status(200).render('admin',{flag:2,link:`mail/update/${req.params.id}`,email:mail[0].email,token:mail[0].token});
});

app.post('/report', async function (req, res) {
    const mails= await Mail.find({token: req.body.token});
    console.log("hel="+mails);
    res.status(200).render('customer',{mails:mails});
});

const port = process.env.PORT || 3000;
console.log(port);
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));
var env = process.env.NODE_ENV || 'development';
console.log(env);
module.exports = server;