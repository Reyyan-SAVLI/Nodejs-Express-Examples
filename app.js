const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');
const errorsController = require('./controllers/errors');
const mongoConnect = require('./utility/database').mongoConnect;

const User = require('./models/user');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({extended: false})); 
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    User.findByUserName('reyyan')
    .then(user=> {
        req.user = new User(user.name, user.email, user._id);
        next();
    })
    .catch(err=> { console.log(err); });
})

app.use('/admin' ,adminRoutes);
app.use(userRoutes);

app.use(errorsController.get404Page);

mongoConnect(()=>{
    
    User.findByUserName('reyyan')
    .then(user=>{
        if (!user) {
            user = new User('reyyan', 'reyyan@gmail.com');
            return user.save();
        }
        return user;
    })
    .then(user=>{
        console.log(user);
        app.listen(3000);
    })
    .catch(err=> { console.log(err); });
});
