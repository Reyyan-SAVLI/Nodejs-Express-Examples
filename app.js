const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');
const errorsController = require('./controllers/errors');
const sequelize = require('./utility/database');

const Category = require('./models/category');
const Product = require('./models/product');
const User = require('./models/user');
const Card = require('./models/card');
const CardItem = require('./models/carditem');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({extended: false})); 
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user = user;
        next();
    })
    .catch(err=>{
        console.log(err);
    })
});

app.use('/admin' ,adminRoutes);
app.use(userRoutes);

app.use(errorsController.get404Page);

Product.belongsTo(Category, {foreignKey: {allowNull: false}});
Category.hasMany(Product);

Product.belongsTo(User);
User.hasMany(Product);

User.hasOne(Card);
Card.belongsTo(User);

Card.belongsToMany(Product, {through: CardItem});
Product.belongsToMany(Card, {through: CardItem});

let _user;
sequelize
//.sync({force: true})
.sync()
.then(()=>{

    User.findByPk(1)
    .then(user=>{
        if (!user) {
            return User.create({name: 'reyyansavli', email: 'reyyan@fmail.com'});
        }
        return user;
    })
    .then(user=>{
        _user = user;
        return user.getCard();
    })   
    .then(card=>{
        if (!card) {
            return _user.createCard();
        }
        return card;
    })
    .then(()=>{
        Category.count()
        .then(count=>{
            if (count === 0) {
                Category.bulkCreate([
                    {name: 'Phone', description: 'Phone Category'},
                    {name: 'Computer', description: 'Computer Category'},
                    {name: 'Electronic', description: 'Electronic Category'},
                ]);       
            }
        })
    })
})
.catch((err)=>{
    console.log(err);
});

app.listen(3000, ()=>{
    console.log('listening on port 3000');
});
