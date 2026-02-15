import { loadHeaderFooter, qs, setClick } from "./utils.mjs";

loadHeaderFooter();

setClick("#edit-location", editLocation);

function editLocation() {
    const editLocation = qs("#edit-location");
    const div = editLocation.parentNode;

    editLocation.classList.toggle("hidden");

    div.innerHTML += `
    <input id="search-location" type="text">
    <button id="set-location">Set Location</button>
    `;

    
    // searchLocation;

    setClick("#set-location", () => {
        // setLocation;

        qs("#edit-location").classList.toggle("hidden");
        qs("#search-location").parentNode.removeChild(qs("#search-location"));
        qs("#set-location").parentNode.removeChild(qs("#set-location"));

        // edit event listener gets removed?

    })
}

