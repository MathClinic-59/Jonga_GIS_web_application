export function setupSearch(map, searchLayer) {
    if (!searchLayer || !L.Control.Search) return;

    const searchControl = new L.Control.Search({
        layer: searchLayer,
        propertyName: 'Facility_Name',
        marker: false,
        moveToLocation: function(latlng, title, map) { map.setView(latlng, 12); }
    });

    searchControl.on('search:locationfound', function(e) {
        e.layer.setStyle({ fillColor: '#ffff00', color: '#000000' });
        if(e.layer.openPopup) e.layer.openPopup();
    });

    map.addControl(searchControl);
}