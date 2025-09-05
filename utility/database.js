const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback)=>{
    //MongoClient.connect('mongodb://localhost/node-app')
    MongoClient.connect('mongodb+srv://reyyansvli_db_user:zX62mz9xrL79pKI9@cluster0.xplaywa.mongodb.net/node-app?retryWrites=true&w=majority&appName=Cluster0')
    .then(client =>{
        console.log('Connected');
        _db = client.db();
        callback();
    })
    .catch(err =>{
        console.log(err);
        throw err;
    })
};

const getDb = ()=>{
    if (_db) {
        return _db;
    }
    throw 'No Database';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;