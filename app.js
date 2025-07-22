const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');
const errorsController = require('./controllers/errors');
const sequelize = require('./utility/database');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({extended: false})); 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin' ,adminRoutes);
app.use(userRoutes);

app.use(errorsController.get404Page);

sequelize.sync()
.then((result)=>{
    console.log(result);
})
.catch((err)=>{
    console.log(err);
});

app.listen(3000, ()=>{
    console.log('listening on port 3000');
});


// try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }


// connection.execute('SELECT * FROM products')
// .then((result)=>{
//     console.log(result);
// }).catch((err)=>{
//     console.log(err);
// });