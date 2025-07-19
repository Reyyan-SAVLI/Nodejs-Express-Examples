const products = [
    {id:'12345', name:'Huawei P30 Lite', price:'3000', imageUrl:'1.jpg', description:'Perfect', categoryid:"1"},
    {id:'12346', name:'Samsung S24', price:'25000', imageUrl:'2.jpg', description:'Good', categoryid:"1"},
    {id:'12347', name:'Smasung S25', price:'30000', imageUrl:'3.jpg', description:'Nice', categoryid:"1"},
    {id:'12348', name:'HP Victus Gaming 16', price:'45000', imageUrl:'5.png', description:'Perfect Laptop', categoryid:"2"},
    {id:'12349', name:'Arçelik Refrigerator', price:'60000', imageUrl:'6.jpg', description:'Nice Refrigerator', categoryid:"3"}
];

module.exports = class Product{
    constructor(name, price, imageUrl, description, categoryid){
        this.id = (Math.floor(Math.random()*99999)+1).toString();
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.categoryid = categoryid;
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

    static getProductsByCategoryId(categoryid){
        return products.filter(i=>i.categoryid === categoryid);
    }

    static Update(product){
        const index = products.findIndex(i=> i.id === product.id);

        products[index].name = product.name;
        products[index].price = product.price;
        products[index].imageUrl = product.imageUrl;
        products[index].description = product.description;
        products[index].categoryid = product.categoryid;
    }

    static DeleteById(id){
        const index = products.findIndex(i=> i.id === id);
        products.splice(index,1);
    }
}