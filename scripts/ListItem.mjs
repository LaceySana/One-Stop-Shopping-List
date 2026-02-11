export default class ListItem {
    constructor(name, Product = null, isFavorite = false) {
        this.name = name;
        this.Product = Product;
        this.isFavorite = isFavorite;
    }
}