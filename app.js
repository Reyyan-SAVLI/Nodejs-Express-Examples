const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');
const errorsController = require('./controllers/errors');
const app = express();


app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({extended: false})); 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin' ,adminRoutes);
app.use(userRoutes);


app.use(errorsController.get404Page);


app.listen(3000, ()=>{
    console.log('listening on port 3000');
});



// connection.execute('SELECT * FROM products')
// .then((result)=>{
//     console.log(result);
// }).catch((err)=>{
//     console.log(err);
// });