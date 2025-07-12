const Product = require('../models/product');


exports.getProducts = (req, res, next)=>{
    //res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
    const products = Product.getAll();

    res.render('index', {title: 'Homepage', products: products, path: '/'});
}

exports.getAddProduct = (req, res, next)=>{
    //html dosyaları için
    //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));

    //pug dosyaları için
    res.render('add-product', {title: 'Add a New Product', path: '/admin/add-product'});
}

exports.postAddProduct = (req, res, next)=>{
    const product = new Product(req.body.name, req.body.price, req.body.imageUrl, req.body.description);

    product.saveProduct();
    res.redirect('/'); 
}