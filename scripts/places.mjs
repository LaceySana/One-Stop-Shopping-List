import { GOOGLE_MAPS_API_KEY as mapsKey } from "./config.mjs";
import { qs, setClick } from "./utils.mjs";


(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: mapsKey,
    v: "weekly",
});

const {Place, SearchNearbyRankPreference} = await google.maps.importLibrary("places");


export async function findLocation(query) {

    const request = {
        textQuery: query,
        fields: ["formattedAddress", "location"],
        includedType: "postal_code",
        useStrictTypeFiltering: true,
        maxResultCount: 1,
        region: 'us',
    };

    const { places } = await Place.searchByText(request);

    if (!places || places.length === 0) return;

    const place = places[0];

    const location = { address: place.formattedAddress, coordinates: place.location };

    return location;

}

export async function searchNearby(center, radius = 20000) {
    // center = {lat: 0, lng: 0}
    // radius = number in meters
    
    // define request options for Nearby API
    const request = {
        fields: [
            'id',
            'displayName',
            'location',
            'formattedAddress',
            'websiteURI',
        ],
        locationRestriction: {
            center,
            radius,
        },
        includedTypes: ["food_store", "grocery_store", "market", "supermarket", "asian_grocery_store", "butcher_shop", "store"],
        maxResultCount: 10,
        excludedTypes: ["restaurant", "fast_food_restaurant", "cafe", "truck_stop", "thrift_store"],
        rankPreference: SearchNearbyRankPreference.POPULARITY,
    };
    
    // call searchNearby to get a list of Place objects containing place details
    const { places } = await Place.searchNearby(request);
    
    return places;
}