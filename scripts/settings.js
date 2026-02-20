import { findLocation, searchNearby } from "./places.mjs";
import { getLocalStorage, qs, setClick, setLocalStorage } from "./utils.mjs";


const currLocation = qs("#current-location");
const storeDistance = qs("#store-distance");

let location = getLocalStorage("location");
let distance = getLocalStorage("distance") || 20000;

currLocation.innerHTML = location ? location.address : "-Not Set-";
storeDistance.innerHTML = distance ? distance : "-Not Set-";


setClick("#edit-location", editLocation);
setClick("#edit-distance", editDistance);

function editLocation() {
    const editLocation = qs("#edit-location");
    const div = editLocation.parentNode;

    editLocation.classList.toggle("hidden");
    currLocation.classList.toggle("hidden");

    div.insertAdjacentHTML("beforeend", `
    <input id="search-location" type="text" placeholder="Enter Zipcode">
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
        editLocation.classList.toggle("hidden");
        currLocation.classList.toggle("hidden");
        qs("#search-location").parentNode.removeChild(qs("#search-location"));
        qs("#set-location").parentNode.removeChild(qs("#set-location"));

        setLocalStorage("location", location);
        setLocalStorage("distance", distance);
        currLocation.innerHTML = location.address;

        const stores = await searchNearby(location.coordinates);
        setNearbyPlaces(stores);
    }
}

function editDistance() {
    const editDistance = qs("#edit-distance");
    const div = editDistance.parentNode;

    editDistance.classList.toggle("hidden");
    storeDistance.classList.toggle("hidden");

    div.insertAdjacentHTML("beforeend", `
    <input id="input-distance" type="number" min="1000" max="50000" placeholder="Enter Distance in meters">
    <button id="set-distance">Set Distance</button>
    `);
    
    const distanceInput = qs("#input-distance");
    distanceInput.addEventListener("keyup", async (e) => {
        if (e.key === "Enter") {
            const distance = parseInt(distanceInput.value);
            setDistance(distance);
        }
    })
    

    setClick("#set-distance", async () => {
        const distance = parseInt(distanceInput.value);
        setDistance(distance);
    })

    const setDistance = async function (distance) {
        editDistance.classList.toggle("hidden");
        storeDistance.classList.toggle("hidden");
        qs("#input-distance").parentNode.removeChild(qs("#input-distance"));
        qs("#set-distance").parentNode.removeChild(qs("#set-distance"));

        
        setLocalStorage("distance", distance);
        storeDistance.innerHTML = `${distance} meters`;
        
        const stores = await searchNearby(location.coordinates, distance);
        setNearbyPlaces(stores);
    }
}

async function setNearbyPlaces(stores) {
    stores = stores.map(store => ({...store.Gi, encodedURI: encodeURIComponent(store.websiteURI)}));
    setLocalStorage("nearby-stores", stores);
}