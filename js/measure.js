export function setupRouting(map) {
    if (!L.Routing) return;
    L.Routing.control({
        waypoints: [L.latLng(-33.96109, 25.61494), L.latLng(-33.91799, 25.57007)],
        routeWhileDragging: true,
        collapsible: true,
        position: 'topleft'
    }).addTo(map);
}