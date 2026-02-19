import ListItem, { listItemTemplate } from "./ListItem.mjs";
import { getLocalStorage, qs, renderListWithTemplate } from "./utils.mjs";

export default class ShoppingList {
    constructor(localStorageKey, outputSelector) {
        this.key = localStorageKey;
        this.outputSelector = outputSelector;
        this.list = [];
    }

    init() {
        this.listElem = qs(this.outputSelector);
        this.list = this.listFromJson();
        this.renderList();
    }

    listFromJson() {
        const objList = getLocalStorage(this.key) || [];
        return objList.map((obj) => new ListItem(obj.name, obj.Product, obj.isFavorite));
    }

    renderList() {
        renderListWithTemplate(this.list, listItemTemplate, this.listElem);
        if (!this.listElem.hasListener) {
            this.listElem.hasListener = true;
            this.listElem.addEventListener("click", (e) => {
                if (e.target.classList.contains("mark-item")) {
                    e.target.classList.toggle("marked");
                } else if (e.target.classList.contains("remove-item")) {
                    const itemIndex = this.list.findIndex((item) => item.name === e.target.closest("li").textContent);
                    const item = this.list[itemIndex];
                    console.log(itemIndex);
                    console.log(item);
                    console.log(item.name);
                    item.removeItemFromLocalStorage();
                    e.target.closest("li").remove();
                }
            })
        }
    }
}