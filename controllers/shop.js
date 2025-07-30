const Product = require('../models/product');
const Category = require('../models/category');
const { where } = require('sequelize');

exports.getIndex = (req, res, next)=>{
    Product.findAll(
        {
            attributes: ['id','name','price','imageUrl'],
        })
    .then(products=>{
        Category.findAll()
        .then(categories=>{
            res.render('shop/index', {
            title: 'Shopping', 
            products: products, 
            categories: categories,
            path: '/'});
        })
        .catch((err)=>{
            console.log(err);
        });
    })
    .catch((err)=>{
        console.log(err);
    });    
}

exports.getProducts = (req, res, next)=>{
    Product.findAll(
        {
            attributes: ['id','name','price','imageUrl'],
        })
    .then(products=>{
        Category.findAll()
        .then(categories=>{
            res.render('shop/products', {
            title: 'Products', 
            products: products, 
            categories: categories,
            path: '/products'});
        })
        .catch((err)=>{
            console.log(err);
        });
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
        const category = categories.find(i=>i.id==categoryid);
        return category.getProducts();
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
    Product.findAll({
        attributes: ['id','name','price','imageUrl','description'],
        where: {id: req.params.productid}})
    .then(products=>{
        res.render('shop/product-detail', {
        title: products[0].name, 
        product: products[0], 
        path: '/products'});
    })
    .catch((err)=>{
        console.log(err);
    });
}


exports.getCard = (req, res, next)=>{
    req.user.getCard()
    .then(card=>{
        return card.getProducts()
               .then(products=>{
                    console.log(products);
                    res.render('shop/card', {
                        title: 'Card', 
                        path: '/card',
                        products: products
                    });
               })
               .catch(err=>{ console.log(err); })
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.postCard = (req, res, next)=>{
    const productId = req.body.productId;
    let quantity = 1;
    let userCard;

    req.user.getCard()
    .then(card=>{
        userCard = card;
        return card.getProducts({ where: {id: productId}});
    })
    .then(products=>{
        let product;
        if (products.length > 0) {
            product = products[0];
        }

        if (product) {
            quantity += product.cardItem.quantity;
            return product;
        }
        return Product.findByPk(productId);
    })
    .then(product =>{
        userCard.addProduct(product,{
            through: {
                quantity: quantity
            }
        })
    })
    .then(()=>{
        res.redirect('/card');
    })
    .catch(err=>{
        console.log(err);
    })
}


exports.getOrders = (req, res, next)=>{

    res.render('shop/orders', {title: 'Orders', path: '/orders'});
}
