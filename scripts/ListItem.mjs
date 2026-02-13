import { getLocalStorage, qs, setLocalStorage } from "./utils.mjs";

export function listItemTemplate(item) {
    return `
        <li><button class="mark-item"><button> ${item.name} <button class="remove-item">✖<button></li>
        `;
};

export default class ListItem {
    constructor(name, Product = null, isFavorite = false) {
        this.name = name;
        this.Product = Product;
        this.isFavorite = isFavorite;
    }

    async init() {
        this.addItemToHTML();
        this.addItemToLocalStorage();
    }

    addItemToHTML() {
        const list = qs("#item-list");
        list.innerHTML += listItemTemplate(this.name);

        list.addEventListener("click", (e) => {
            if (e.target.classList.contains("mark-item")) {
                e.target.classList.toggle("marked");
            }
        })
    }

    addItemToLocalStorage() {
        const storedList = getLocalStorage("shopping-list") || [];
        storedList.push(this);
        setLocalStorage("shopping-list", storedList);
    }
}