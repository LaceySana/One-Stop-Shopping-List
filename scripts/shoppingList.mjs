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
        this.list = getLocalStorage(this.key);
        this.renderList();
    }

    renderList() {
        renderListWithTemplate(this.list, listItemTemplate, this.listElem);
        if (!this.listElem.hasListener) {
            this.listElem.hasListener = true;
            this.listElem.addEventListener("click", (e) => {
                if (e.target.classList.contains("mark-item")) {
                    e.target.classList.toggle("marked");
                } else if (e.target.classList.contains("remove-item")) {
                    // const htmlList = this.listElem.children;
                    // const itemIndex = htmlList.indexOf(e.target.closest("li"));
                    console.log(e.target.closest("li").textContent);
                    const itemIndex = this.list.findIndex((item) => item.name === e.target.closest("li").textContent);
                    console.log(this.list[0]);
                    console.log(itemIndex);
                    const item = this.list[itemIndex];
                    console.log(typeof item);
                    item.removeItemFromLocalStorage();
                    e.target.closest("li").remove();
                }
            })
        }
    }
}