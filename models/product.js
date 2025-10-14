const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name required'],
        minlength: [5, 'Enter min 5 characters for the product name!'],
        maxlength: [200, 'Enter max 200 characters for the product name!'],
        uppercase: true,
    },
    price: {
        type: Number,
        required: function(){
            return this.isActive;
        },
        min: 0,
        max: 10000,
        get: value => Math.round(value),
        set: value => Math.round(value)
    },
    description: {
        type: String,
        minlength: 5
    },
    imageUrl: String,
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: Array,
        validate: {
            validator: function(value) {
                return value && value.length > 0;
            },
            message: 'Enter at least 1 tag for the product!'
        }
    },
    isActive: Boolean,
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    }],
});

module.exports = mongoose.model('Product', productSchema);
