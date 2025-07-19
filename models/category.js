const categories = [
    {id: "1", name: "Phone", description: "Phone category products"},
    {id: "2", name: "Computer", description: "Computer category products"},
    {id: "3", name: "White Goods", description: "White Goods category products"},
];

module.exports = class Category{
    constructor(name, description){
        this.id = (categories.length + 1).toString();
        this.name = name;
        this.description = description;
    }

    saveCategory(){
        categories.push(this);
    }

    static getAll(){
        return categories;
    }

    static getById(id){
        return categories.find(i=>i.id === id);
    }

    static update(category){
        const index = categories.findIndex(i=>i.id === category.id);

        categories[index].name = category.name;
        categories[index].description = category.description; 
    }

    static deleteById(id){
        const index = categories.findIndex(i=>i.id === id);
        categories.splice(index,1); 
    }
}