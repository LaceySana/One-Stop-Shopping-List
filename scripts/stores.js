import { getLocalStorage, setClick, setLocalStorage, qs } from "./utils.mjs";


const storesList = qs("#display-stores");
let nearbyStores = getLocalStorage("nearby-stores") || [];

displayStores(nearbyStores);

function displayStores(stores) {

    storesList.innerHTML = "";
    
    if (!stores.length > 0) {
        storesList.innerHTML = "No stores found.";
        return;
    }

    for (const store of stores) {
        console.log(store);
        storesList.insertAdjacentHTML("beforeend", `
            <li class="store-card">
                <div class="card-front">
                    <h4>${store.displayName}</h4>
                    <p>${store.formattedAddress}</p>
                    <p><strong>Phone Number: <br></strong>${store.nationalPhoneNumber}</p>
                    <input type="hidden" value="${store.id}">
                </div>
                <div class="card-back hidden">
                    <h5>${store.displayName}</h4>
                    <p><strong>Rating: </strong>${store.rating}</p>
                    <p><strong>Has Delivery: </strong>${store.hasDelivery === true ? "Yes" : store.hasDelivery === false ? "No" : "Unknown"}</p>
                    <p><strong>Accepts Credit Cards: </strong>${!store.paymentOptions ? "Unknown" : store.paymentOptions.acceptsCreditCards === true ? "Yes" : "No"}</p>
                    <p><strong>Has Restroom: </strong>${store.hasRestroom === true ? "Yes" : store.hasRestroom === false ? "No" : "Unknown"}</p>
                    <p><strong>Website: </strong><a href="${store.websiteURI}" target="__blank">${store.websiteURI}</a></p>
                </div>
            </li>
            `);
    }

    setClick("#display-stores", (e) => {
        for (let div of e.target.closest(".store-card").children) {
            div.classList.toggle("hidden");

        }
    
    });
}

// function removeStore(store_id) {
//     const storesList = getLocalStorage("nearby-stores") || [];
//     const index = storesList.findIndex(store => store.id === store_id);
//     if (index > -1) {
//         storesList.splice(index, 1);
//         setLocalStorage("nearby-stores", storesList);
//         displayStores(storesList);
//     }
// }
