import ListItem, { listItemTemplate } from "./ListItem.mjs";
import ShoppingList from "./shoppingList.mjs";
import { getLocalStorage, loadHeaderFooter, qs, renderListWithTemplate, setClick } from "./utils.mjs";

loadHeaderFooter();

// const storedList = getLocalStorage("shopping-list") || [];
// renderListWithTemplate(storedList, listItemTemplate, qs("#item-list"));

const shoppingList = new ShoppingList("shopping-list", "#item-list");
shoppingList.init();

setClick("#add-item", addNewItem);

function addNewItem() {
    let inputDiv = qs("#input-div");
    if (!inputDiv) {
        const listMenu = qs("#list-btns");
        inputDiv = document.createElement("div");
        inputDiv.setAttribute("id", "input-div")
        listMenu.after(inputDiv);
        
        const inputLabel = document.createElement("label");
        inputLabel.textContent = "New Item: ";
        
        const itemInput = document.createElement("input");
        inputLabel.appendChild(itemInput);
        itemInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const newItem = new ListItem(itemInput.value);
                newItem.init();
                inputDiv.parentNode.removeChild(inputDiv);
            }
        })
        
        const inputBtn = document.createElement("input");
        inputBtn.setAttribute("id", "inputSubmit");
        inputBtn.setAttribute("type", "submit");
        inputBtn.setAttribute("value", "Add Item");
        
        inputDiv.appendChild(inputLabel);
        inputDiv.appendChild(inputBtn);
        itemInput.focus();
    
        setClick("#inputSubmit", () => {
            const newItem = new ListItem(itemInput.value);
            newItem.init();
            inputDiv.parentNode.removeChild(inputDiv);
        });
    } else {
        inputDiv.parentNode.removeChild(inputDiv);
    }
}