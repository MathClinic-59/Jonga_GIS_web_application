export function setupSpatialAnalysis(map, layers) {
    const runBtn = document.getElementById('btn-run-buffer');
    const selectEl = document.getElementById('buffer-layer');
    if (!runBtn || !selectEl) return;

    // 1. Clear existing hardcoded options and dynamically populate from layers object
    selectEl.innerHTML = '';
    
    Object.keys(layers).forEach(layerName => {
        const layer = layers[layerName];
        
        // Only include layers that can be converted to GeoJSON (skip WMS/Tile layers)
        if (layer && typeof layer.toGeoJSON === 'function') {
            const option = document.createElement('option');
            option.value = layerName;
            option.textContent = layerName;
            selectEl.appendChild(option);
        }
    });

    let bufferResultLayer = null;

    // 2. Event listener using dynamic key lookup
    runBtn.addEventListener('click', () => {
        const selectedLayerName = selectEl.value;
        const distanceKm = parseFloat(document.getElementById('buffer-distance').value);

        if (!selectedLayerName || !layers[selectedLayerName]) {
            return alert('Selected layer is not loaded or unavailable!');
        }

        const targetLayer = layers[selectedLayerName];

        try {
            const geojson = targetLayer.toGeoJSON();

            // Ensure dataset actually has features to buffer
            if (!geojson || (geojson.type === 'FeatureCollection' && geojson.features.length === 0)) {
                return alert('The selected layer has no vector features to perform analysis on.');
            }

            // Run Turf.js Buffer
            const buffered = turf.buffer(geojson, distanceKm, { units: 'kilometers' });

            // Remove previous buffer result if present
            if (bufferResultLayer) {
                map.removeLayer(bufferResultLayer);
            }

            // Add new buffer output layer to the map
            bufferResultLayer = L.geoJson(buffered, {
                style: { 
                    color: '#e53e3e', 
                    fillColor: '#feb2b2', 
                    fillOpacity: 0.4, 
                    weight: 2 
                }
            }).addTo(map);

            // Zoom map to buffer extent
            if (bufferResultLayer.getBounds().isValid()) {
                map.fitBounds(bufferResultLayer.getBounds());
            }

        } catch (error) {
            console.error('Error executing spatial buffer analysis:', error);
            alert('Could not compute buffer for this layer. Ensure it is a valid vector dataset.');
        }
    });
}
