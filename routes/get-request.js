const express= require('express');
const router= express.Router();

router.get('/', async function (req, res) {
    res.status(200).render('index');
});

router.get('/staff', async function (req, res) {
    res.status(200).render('staff');
});

router.get('/about', async function (req, res) {
    res.status(200).render('about');
});

router.get('/location', async function (req, res) {
    res.status(200).render('location');
});

router.get('/admin', async function (req, res) {
    res.status(200).render('admin',{flag:0,link:'/mail'});
});

router.get('/info',async(req,res)=>{
    res.status(200).redirect('/admin');
});

router.get('/admin-:id', (req, res)=> {
    res.status(200).redirect('/admin');
});

router.get('/report', async function (req, res) {
    res.status(200).render('customer',{mails:[],flag:1});
});

module.exports= router;
