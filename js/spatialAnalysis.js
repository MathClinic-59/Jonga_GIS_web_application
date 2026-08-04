export function setupSpatialAnalysis(map, layers) {
    const runBtn = document.getElementById('btn-run-buffer');
    const selectEl = document.getElementById('buffer-layer');
    if (!runBtn || !selectEl) return;

    // Populate dropdown dynamically with all vector layers
    selectEl.innerHTML = '';
    Object.keys(layers).forEach(layerName => {
        const layer = layers[layerName];
        if (layer && typeof layer.toGeoJSON === 'function') {
            const option = document.createElement('option');
            option.value = layerName;
            option.textContent = layerName;
            selectEl.appendChild(option);
        }
    });

    let bufferResultLayer = null;

    runBtn.addEventListener('click', () => {
        const selectedLayerName = selectEl.value;
        const distanceKm = parseFloat(document.getElementById('buffer-distance').value);

        if (!selectedLayerName || !layers[selectedLayerName]) {
            return alert('Selected layer is not loaded on the map!');
        }

        const targetLayer = layers[selectedLayerName];

        try {
            const geojson = targetLayer.toGeoJSON();
            if (!geojson || (geojson.type === 'FeatureCollection' && geojson.features.length === 0)) {
                return alert('Selected layer contains no vector features.');
            }

            // Perform Turf Buffer
            const buffered = turf.buffer(geojson, distanceKm, { units: 'kilometers' });

            if (bufferResultLayer) map.removeLayer(bufferResultLayer);

            // Add resulting buffer layer to map and update bounds
            bufferResultLayer = L.geoJson(buffered, {
                style: { color: '#e53e3e', fillColor: '#feb2b2', fillOpacity: 0.4, weight: 2 }
            }).addTo(map);

            if (bufferResultLayer.getBounds().isValid()) {
                map.fitBounds(bufferResultLayer.getBounds());
            }

        } catch (err) {
            console.error(err);
            alert('Analysis failed for selected layer.');
        }
    });
}
