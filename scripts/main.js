import ListItem from "./ListItem.mjs";
import ShoppingList from "./shoppingList.mjs";
import { getLocalStorage, qs, setClick } from "./utils.mjs";
import { categorizeItem, itemCategories } from "./itemCategories.mjs";
import { findStoresByType } from "./places.mjs";

const shoppingList = new ShoppingList("shopping-list", "#item-list");
shoppingList.init();
displayStoreSuggestions();

async function displayStoreSuggestions() {
    const listItems = qs("#item-list").children;
    console.log(listItems);
    for (let item of listItems) {
        if (!item.querySelector(".store-suggestions")) {
            item.insertAdjacentHTML("beforeend", await getStoreSuggestions(item.querySelector("p").textContent));
        }
    };  
}

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
        itemInput.setAttribute("required", true);
        inputLabel.appendChild(itemInput);
        itemInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                if (!itemInput.value) {
                    return;
                }
                const newItem = new ListItem(itemInput.value);
                newItem.init();
                displayStoreSuggestions();
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
            if (!itemInput.value) {
                return;
            }
            const newItem = new ListItem(itemInput.value);
            newItem.init();
            displayStoreSuggestions();
            inputDiv.parentNode.removeChild(inputDiv);
        });
    } else {
        inputDiv.parentNode.removeChild(inputDiv);
    }
}

export async function getStoreSuggestions(item) {
    if (!getLocalStorage("location")) {
        return "Please set location.";
    }
    try {
        const category = categorizeItem(item);
        const location = getLocalStorage("location").coordinates;
        const radius = parseInt(getLocalStorage("distance"));
        const storeSuggestions = await findStoresByType(category, location, radius);
        console.log(storeSuggestions);
        let suggestionsDiv = `<div class="store-suggestions">`;
        for (let store of storeSuggestions) {
            console.log(store.displayName);
            suggestionsDiv +=`<div>`;
            suggestionsDiv += `
                <h5>${store.displayName}</h5>
                <p><strong>Rating: </strong>${store.rating}</p>
            `;
            suggestionsDiv +=`</div>`;
        };
            suggestionsDiv +=`</div>`;
        return suggestionsDiv;
    } catch (error) {
        console.log("Unable to find store suggestions: " + error);
        return;
    }

}
    