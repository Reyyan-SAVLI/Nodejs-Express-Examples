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

    getCard() {
        const ids =  this.card.items.map(i=> {
            return i.productId;
        });

        const db = getDb();

        return db.collection('products')
            .find({
                _id: {$in: ids}
            })
            .toArray()
            .then(products=> {
                return products.map(p=> {
                    return {
                        ...p,
                        quantity: this.card.items.find(i=> {
                            return i.productId.toString() === p._id.toString()
                        }).quantity
                    }
                });
            });
    }

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
                {$set: { card: { items: updatedCardItems}}}
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

    deleteCardItem(productid) {
        const cardItems = this.card.items.filter(item=> {
            return item.productId.toString() !== productid.toString()
        });

        const db = getDb();

        return db.collection('users')
            .updateOne(
                {_id: new mongodb.ObjectId(this._id)},
                {$set: { card: { items: cardItems }}}
            )
    }
}

module.exports = User;