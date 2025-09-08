const Product = require('../models/product');
const Category = require('../models/category');

exports.getIndex = (req, res, next)=>{
    Product.findAll()
    .then(products=>{
        Category.findAll()
            .then(categories=> {
                res.render('shop/index', {
                    title: 'Shopping', 
                    products: products,
                    categories: categories,
                    path: '/'
                });
            });
    })
    .catch((err)=>{
        console.log(err);
    });    
}

exports.getProducts = (req, res, next)=>{
    Product.findAll()
    .then(products=>{
        Category.findAll()
            .then(categories=> {
                res.render('shop/products', {
                    title: 'Products', 
                    products: products, 
                    categories: categories,
                    path: '/products'
                });
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
        res.render('shop/card', {
            title: 'Card', 
            path: '/card',
            poducts: products
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
    .getCard()
    .then(card =>{
        return card.getProducts({where: {id: productid}});
    })
    .then(products =>{
        const product = products[0];
        return product.cardItem.destroy();
    })
    .then(result =>{
        res.redirect('/card');
    });
}

exports.getOrders = (req, res, next)=>{
    req.user
    .getOrders({include: ['products']})
    .then(orders =>{
        console.log(orders);

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
    let userCard;
    
    req.user
    .getCard()
    .then(card =>{
        userCard = card;
        return card.getProducts();
    })
    .then(products =>{
        return req.user.createOrder()
        .then(order =>{
            order.addProducts(products.map(product =>{
                product.orderItem = {
                    quantity: product.cardItem.quantity,
                    price: product.price
                }
                return product;
            }));
        })
        .catch(err =>{console.log(err);});
    })
    .then(() =>{
        userCard.setProducts(null);
    })
    .then(() =>{
        res.redirect('/orders');
    })
    .catch(err =>{
        console.log(err);
    });
}
