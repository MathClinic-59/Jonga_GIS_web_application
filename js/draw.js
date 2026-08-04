export function setupDrawTools(map) {
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
        edit: { featureGroup: drawnItems },
        draw: { polygon: true, polyline: true, rectangle: true, circle: true, marker: true }
    });

    map.addControl(drawControl);
    map.on(L.Draw.Event.CREATED, function (event) {
        drawnItems.addLayer(event.layer);
    });

    return drawnItems;
}