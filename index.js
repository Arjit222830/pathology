const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require('config');
const google_login = require('./routes/google_login');
const mail = require('./routes/mails');
const {Mail}= require('./models/mail');

mongoose.connect(config.get('db'), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Connected to ${config.get('db')}...`))
    .catch(err => console.log(`Could not connect to ${config.get('db')}...`, err));

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use(express.json());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/login-with-google', google_login);
app.use('/mail', mail);

require('./prod.js')(app);

app.set("view engine", "pug");

app.get('/', async function (req, res) {
    res.status(200).render('index');
});

app.get('/staff', async function (req, res) {
    res.status(200).render('staff');
});

app.get('/about', async function (req, res) {
    res.status(200).render('about');
});

app.get('/location', async function (req, res) {
    res.status(200).render('location');
});

app.get('/admin', async function (req, res) {
    res.status(200).render('admin');
});

app.get('/report', async function (req, res) {

    res.status(200).render('customer',{mails:[]});
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