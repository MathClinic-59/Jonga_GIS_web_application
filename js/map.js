import { CONFIG } from './config.js';

export function initMap() {
    const map = L.map('map', {
        center: CONFIG.map.center,
        zoom: CONFIG.map.zoom,
        zoomControl: true
    });

    map.on("mousemove", function(e) {
        const coordDisplay = document.getElementById("coordinate");
        if (coordDisplay) {
            coordDisplay.innerHTML = `Lat: ${e.latlng.lat.toFixed(5)} | Lng: ${e.latlng.lng.toFixed(5)}`;
        }
    });

    return map;
}