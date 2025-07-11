const express = require('express');
const router = express.Router();
const path = require('path');
const { title } = require('process');

router.get('/add-product',(req, res, next)=>{
    //html dosyaları için
    //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));

    //pug dosyaları için
    res.render('add-product', {title: 'Add Product'});
});

router.post('/add-product', (req, res, next)=>{
    console.log(req.body);

    res.redirect('/'); 
});

module.exports = router;
