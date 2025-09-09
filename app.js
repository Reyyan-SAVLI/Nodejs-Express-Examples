const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');
const errorsController = require('./controllers/errors');

const mongoose = require('mongoose');

const User = require('./models/user');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({extended: false})); 
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    User.findOne({name: 'reyyan'})
    .then(user=> {
        req.user = user;
        console.log(req.user);
        next();
    })
    .catch(err=> { console.log(err); });
})

app.use('/admin' ,adminRoutes);
app.use(userRoutes);

app.use(errorsController.get404Page);

mongoose.connect(process.env.MONGO_ATLAS)
    .then(()=> {
        console.log('Connected to mongodb');
        User.findOne({name: 'reyyan'})
            .then(user=>{
                if (!user) {
                    user = new User({
                        name: 'reyyan',
                        email: 'reyyan@gmail.com',
                        card: {
                            items: []
                        }
                    });
                    return user.save();
                }
                return user;
            })
            .then(user=>{
                console.log(user);
                app.listen(3000);
            })
            .catch(err=> { console.log(err); });
    })
    .catch(err=> {
        console.log(err);
    })
