const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const adminRoutes = require('./routes/admin');
// const userRoutes = require('./routes/shop');
const errorsController = require('./controllers/errors');
const mongoConnect = require('./utility/database').mongoConnect;

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({extended: false})); 
app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin' ,adminRoutes);
// app.use(userRoutes);

app.use(errorsController.get404Page);

mongoConnect(()=>{
    app.listen(3000);
});
