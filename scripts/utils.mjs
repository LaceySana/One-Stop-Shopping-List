export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}

export function setClick(selector, callback) {
    qs(selector).addEventListener("touchend", (event) => {
        event.preventDefault();
        callback();
    });
    qs(selector).addEventListener("click", callback);
}


export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function renderListWithTemplate(list, template, parentElement, position = "afterbegin", clear = false) {
    const htmlStrings = list.map(template);
    //if clear is true, clear out parent contents
    if (clear) {
        parentElement.innerHTML = "";
    }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
    // if (callback) {
    //     callback();
    // }
}

export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML = template;
    if (callback) {
        callback(data);
    }
}

export async function loadTemplate(path) {
    const response = await fetch(path);
    return await response.text();
}

export async function loadHeaderFooter() {
    const templateHeader = await loadTemplate("../partials/header.html");
    const templateFooter = await loadTemplate("../partials/footer.html");

    const header = document.querySelector("#dynamic-header");
    const footer = document.querySelector("#dynamic-footer");

    renderWithTemplate(templateHeader, header);
    renderWithTemplate(templateFooter, footer);

}

export function milesToMeters(miles) {
    return Math.round(miles * 1,609.344);
}

export function metersToMiles(meters) {
    return Math.round(meters / 1,609.344);
}

