const mapsKey = import.meta.env.GOOGLE_MAPS_API_KEY;

(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: mapsKey,
    v: "weekly",
});

const {Place} = await google.maps.importLibrary("places");

// set event listener for an input object to trigger findLocation

async function findLocation(query) {
    const request = {
        textQuery: query,
        fields: ["displayName", "location"]
    };

    const { places } = await Place.searchByText(request);

    // display list of places for user to select from

    // save / return location from chosen option
}

async function searchNearby(center, radius) {
    // center = {lat: 0, lng: 0}
    // radius = number in meters
    
    
    // define request options for Nearby API
    const request = {
        fields: [
            'displayName',
        ],
        locationRestriction: {
            center,
            radius,
        },
        includePrimaryTypes: ["food_store", "grocery_store", "market", "supermarket", "asian_grocery_store", "butcher_shop", "store"]
    };
    
    // call searchNearby to get a list of Place objects containing place details
    const { stores } = await Place.searchNearby(request);
    
    return stores;
}