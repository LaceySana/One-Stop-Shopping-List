import { loadHeaderFooter, qs, setClick } from "./utils.mjs";

loadHeaderFooter();

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
                addItem();
            }
        })
    
        const addItem = function () {
            const newItem = itemInput.value;
            inputDiv.parentNode.removeChild(inputDiv);
            
            const list = qs("#item-list");
            const li = document.createElement("li");
            li.innerHTML = `
            <button class="mark-item">⬜<button> ${newItem}
            `;

            const markBtns = document.querySelectorAll(".mark-items");
            
    
            list.appendChild(li);
        }
        
        const inputBtn = document.createElement("input");
        inputBtn.setAttribute("id", "inputSubmit");
        inputBtn.setAttribute("type", "submit");
        inputBtn.setAttribute("value", "Add Item");
    
        inputDiv.appendChild(inputLabel);
        inputDiv.appendChild(inputBtn);
        itemInput.focus();
        
        setClick("#inputSubmit", addItem);
    } else {
        inputDiv.parentNode.removeChild(inputDiv);
    }
}