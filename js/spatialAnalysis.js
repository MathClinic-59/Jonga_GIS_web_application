export function setupSpatialAnalysis(map, layers) {
    const runBtn = document.getElementById('btn-run-buffer');
    if (!runBtn) return;

    let bufferResultLayer = null;

    runBtn.addEventListener('click', () => {
        const selectedOption = document.getElementById('buffer-layer').value;
        const distanceKm = parseFloat(document.getElementById('buffer-distance').value);

        let targetLayer = selectedOption === 'hospitals' ? layers["Health Facilities"] : layers["South African Roads"];
        if (!targetLayer) return alert('Selected layer is not loaded on the map!');

        const geojson = targetLayer.toGeoJSON();
        const buffered = turf.buffer(geojson, distanceKm, { units: 'kilometers' });

        if (bufferResultLayer) map.removeLayer(bufferResultLayer);

        bufferResultLayer = L.geoJson(buffered, {
            style: { color: '#e53e3e', fillColor: '#feb2b2', fillOpacity: 0.4, weight: 2 }
        }).addTo(map);

        map.fitBounds(bufferResultLayer.getBounds());
    });
}