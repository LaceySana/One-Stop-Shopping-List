import { findLocation, searchNearby } from "./places.mjs";
import { getLocalStorage, loadHeaderFooter, qs, setClick, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();

const currLocation = qs("#current-location");
const storesList = qs("#display-stores");

let location = getLocalStorage("location") || {};
let nearbyStores = getLocalStorage("nearby-stores") || [];

currLocation.innerHTML = location ? location.address : "-Not Set-";
displayStores(nearbyStores);


setClick("#edit-location", editLocation);

function editLocation() {
    const editLocation = qs("#edit-location");
    const div = editLocation.parentNode;

    editLocation.classList.toggle("hidden");
    currLocation.classList.toggle("hidden");

    div.insertAdjacentHTML("beforeend", `
    <input id="search-location" type="text" placeholder="Enter Zipcode">
    <ul id="search-results"></ul>
    <button id="set-location">Set Location</button>
    `);
    
    // searchLocation;
    const locationInput = qs("#search-location");
    locationInput.addEventListener("keyup", async (e) => {
        if (e.key === "Enter") {
            // setLocation;
            const location = await findLocation(locationInput.value);
            setLocation(location);
        }
    })
    

    // setLocation;
    setClick("#set-location", async () => {
        const location = await findLocation(locationInput.value);
        setLocation(location);
    })

    const setLocation = async function (location) {
        if (qs("#search-results")) {
            qs("#search-results").parentNode.removeChild(qs("#search-results"));
        }

        editLocation.classList.toggle("hidden");
        currLocation.classList.toggle("hidden");
        qs("#search-location").parentNode.removeChild(qs("#search-location"));
        qs("#set-location").parentNode.removeChild(qs("#set-location"));

        setLocalStorage("location", location);
        currLocation.innerHTML = location.address;

        const stores = await searchNearby(location.coordinates);
        setNearbyPlaces(stores);
        displayStores(stores);
    }
}

async function setNearbyPlaces(stores) {
    setLocalStorage("nearby-stores", stores);
}

function displayStores(stores) {

    storesList.innerHTML = "";
    
    if (!stores.length > 0) {
        storesList.innerHTML = "No stores found.";
        return;
    }

    for (const store of stores) {
        storesList.insertAdjacentHTML("beforeend", `
            <li>
                <h4>${store.displayName}</h4>
                <p>${store.formattedAddress}</p>
                <input type="hidden" value="${store.id}">
                <button class="remove-store">Remove Store</button>
            </li>
        `);
    }

    setClick("#display-stores", (e) => {
        if (e.target.classList.contains("remove-store")) {
            const store_id = e.target.closest("li").querySelector("input").value;
            removeStore(store_id);
        }
    });
}

function removeStore(store_id) {
    const storesList = getLocalStorage("nearby-stores") || [];
    const index = storesList.findIndex(store => store.id === store_id);
    if (index > -1) {
        storesList.splice(index, 1);
        setLocalStorage("nearby-stores", storesList);
        displayStores(storesList);
    }
}