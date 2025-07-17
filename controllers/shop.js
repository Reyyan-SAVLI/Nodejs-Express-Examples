const Product = require('../models/product');

exports.getIndex = (req, res, next)=>{
    //res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
    const products = Product.getAll();

    res.render('shop/index', {title: 'Shopping', products: products, path: '/'});
}

exports.getProducts = (req, res, next)=>{
    const products = Product.getAll();

    res.render('shop/products', {title: 'Products', products: products, path: '/products'});
}

exports.getProduct = (req, res, next)=>{
    const product = Product.getById(req.params.productid);

    res.render('shop/product-detail', {title: product.name, product: product, path: '/products'});
}

exports.getProductDetails = (req, res, next)=>{

    res.render('shop/details', {title: 'Details', path: '/details'});
}

exports.getCard = (req, res, next)=>{

    res.render('shop/card', {title: 'Card', path: '/card'});
}

exports.getOrders = (req, res, next)=>{

    res.render('shop/orders', {title: 'Orders', path: '/orders'});
}
