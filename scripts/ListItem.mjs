import { getLocalStorage, qs, setLocalStorage } from "./utils.mjs";
// import { getStoreSuggestions } from "./main.js";

export function listItemTemplate(item) {
    return `
        <li><button class="mark-item"></button><p id="item-name">${item.name}<p><button class="remove-item"></button></li>
        `;
};

export default class ListItem {
    constructor(name, isFavorite = false) {
        this.name = name;
        this.isFavorite = isFavorite;
    }

    async init() {
        this.addItemToHTML();
        this.addItemToLocalStorage();
    }

    addItemToLocalStorage() {
        const storedList = getLocalStorage("shopping-list") || [];
        storedList.push(this);
        setLocalStorage("shopping-list", storedList);
    }

    removeItemFromLocalStorage() {
        const storedList = getLocalStorage("shopping-list") || [];
        const itemIndex = storedList.findIndex((item) => item.name === this.name);
        console.log(this.name);

        storedList.splice(itemIndex, 1);
        setLocalStorage("shopping-list", storedList);
    }

    addItemToHTML() {
        const list = qs("#item-list");
        list.innerHTML += listItemTemplate(this);

        if (!list.hasListener) {
            list.hasListener = true;
            list.addEventListener("click", (e) => {
                if (e.target.classList.contains("mark-item")) {
                    e.target.classList.toggle("marked");
                } else if (e.target.classList.contains("remove-item")) {
                    this.removeItemFromLocalStorage();
                    e.target.closest("li").remove();
                }
            })
        }
    }
}
// getEventListeners(document.querySelector('#item-list'));