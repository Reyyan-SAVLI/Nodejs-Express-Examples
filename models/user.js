const getDb = require('../utility/database').getDb;
const mongodb = require('mongodb');

class User {
    constructor(name, email, id, card){
        this.name = name;
        this.email = email;
        this._id = id;
        this.card = card ? card : {};
        this.card.items = card ? card.items : [];
    }

    save() {
        const db = getDb();
        return db.collection('users')
        .insertOne(this);
    }

    getCard() {}

    addToCard(product) {

        const index = this.card.items.findIndex(cp=> {
            return cp.productId.toString() === product._id.toString()
        });
        const updatedCardItems = [...this.card.items];

        let itemQuantity = 1;
        if (index >= 0) {
            itemQuantity = this.card.items[index].quantity + 1;
            updatedCardItems[index].quantity = itemQuantity;            
        } else {
            updatedCardItems.push({
                productId: new mongodb.ObjectId(product._id),
                quantity: itemQuantity
            });
        }
        const db = getDb();
        return db.collection('users')
            .updateOne(
                {_id: new mongodb.ObjectId(this._id)},
                {$set: { cart: { items: updatedCardItems}}}
            );
    }

    static findById(userid){
        const db = getDb();
        return db.collection('users')
        .findOne({_id: new mongodb.ObjectId(userid)})
        .then(user=>{
            return user;
        })
        .catch(err =>{
            console.log(err);
        });
    }

    static findByUserName(username){
        const db = getDb();
        return db.collection('users')
        .findOne({name: username})
        .then(user=>{
            return user;
        })
        .catch(err =>{
            console.log(err);
        });
    }
}

module.exports = User;