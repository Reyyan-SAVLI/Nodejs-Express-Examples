const Product = require('../models/product');
const Category = require('../models/category');

exports.getIndex = (req, res, next)=>{
    Product.find()
    .then(products=>{
        res.render('shop/index', {
                    title: 'Shopping', 
                    products: products,
                    path: '/'
                });
        // Category.findAll()
        //     .then(categories=> {
        //         res.render('shop/index', {
        //             title: 'Shopping', 
        //             products: products,
        //             categories: categories,
        //             path: '/'
        //         });
        //     });
    })
    .catch((err)=>{
        console.log(err);
    });    
}

exports.getProducts = (req, res, next)=>{
    Product.find()
    .then(products=>{
        res.render('shop/products', {
                    title: 'Products', 
                    products: products, 
                    path: '/products'
                });
        // Category.findAll()
        //     .then(categories=> {
        //         res.render('shop/products', {
        //             title: 'Products', 
        //             products: products, 
        //             categories: categories,
        //             path: '/products'
        //         });
        //     });
    })
    .catch((err)=>{
        console.log(err);
    });
}

exports.getProductsByCategoryId = (req, res, next)=>{
    const categoryid = req.params.categoryid;
    const model = [];
    
    Category.findAll()
    .then(categories=>{
        model.categories = categories;
        return Product.findByCategoryId(categoryid);
    })
    .then(products=>{
        res.render('shop/products', {
        title: 'Products', 
        products: products, 
        categories: model.categories,
        selectedCategory: categoryid,
        path: '/products'});
    })
    .catch((err)=>{
        console.log(err);
    });      
}

exports.getProduct = (req, res, next)=>{
    Product.findById(req.params.productid)
    .then(product=>{
        res.render('shop/product-detail', {
        title: product.name, 
        product: product, 
        path: '/products'});
    })
    .catch((err)=>{
        console.log(err);
    });
}


exports.getCard = (req, res, next)=>{
    req.user.getCard()
    .then(products=>{
        console.log(products);
        res.render('shop/card', {
            title: 'Card', 
            path: '/card',
            products: products
        });
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.postCard = (req, res, next)=>{
    const productId = req.body.productId;
    Product.findById(productId)
        .then(product=> {
            return req.user.addToCard(product);
        })
        .then(()=> {
            res.redirect('/card');
        })
        .catch(err=> console.log(err));
}

exports.postCardItemDelete = (req, res, next)=>{
    const productid = req.body.productid;

    req.user
        .deleteCardItem(productid)
        .then(() =>{
            res.redirect('/card');
        });
}

exports.getOrders = (req, res, next)=>{
    req.user
        .getOrders()
        .then(orders =>{
            res.render('shop/orders', {
                title: 'Orders', 
                path: '/orders',
                orders: orders
            });
        })
        .catch(err =>{
            console.log(err);
        });
}

exports.postOrder = (req, res, next)=>{
    req.user
        .addOrder()
        .then(()=> {
            res.redirect('/card');
        })
        .catch(err=> console.log(err));
}
