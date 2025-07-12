const express = require('express');
const router = express.Router();
//const path = require('path');

const products = [
        {name: 'Samsung S25', price: 30000, image: '1.jpg', description: 'Nice Phone 1'},
        {name: 'Samsung S24', price: 25000, image: '2.jpg', description: 'Nice Phone 2'},
        {name: 'Samsung S23', price: 20000, image: '3.jpg', description: 'Nice Phone 3'},
        {name: 'Samsung S22', price: 15000, image: '4.jpg', description: 'Nice Phone 4'}
    ]


router.get('/add-product',(req, res, next)=>{
    //html dosyaları için
    //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));

    //pug dosyaları için
    res.render('add-product', {title: 'Add a New Product', path: '/admin/add-product'});
});

router.post('/add-product', (req, res, next)=>{
    console.log(req.body);

    products.push({name: req.body.name, price: req.body.price, image: req.body.image, description: req.body.description});

    res.redirect('/'); 
});

exports.routes = router;
exports.products = products;
