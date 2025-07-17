const products = [
    {id:'12345', name:'Huawei P30 Lite', price:'3000', imageUrl:'1.jpg', description:'Perfect'},
    {id:'12346', name:'Samsung S24', price:'25000', imageUrl:'2.jpg', description:'Good'},
    {id:'12347', name:'Smasung S25', price:'30000', imageUrl:'3.jpg', description:'Nice'}
];

module.exports = class Product{

    constructor(name, price, imageUrl, description){
        this.id = Math.floor(Math.random()*99999)+1;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
    }

    saveProduct(){
        products.push(this);
    }

    static getAll(){
        return products;
    }

    static getById(id){
        const product = products.find(i=>i.id === id);
        return product;
    }
}