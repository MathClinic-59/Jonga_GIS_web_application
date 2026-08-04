// js/spatialAnalysis.js

export function setupSpatialAnalysis(map, layers) {
    const runBtn = document.getElementById('btn-run-buffer');
    const selectEl = document.getElementById('buffer-layer');
    if (!runBtn || !selectEl) return;

    // Helper function to update the dropdown with ONLY currently active/selected layers
    const updateTargetLayerDropdown = () => {
        const currentSelection = selectEl.value; // Preserve user's current choice if still active
        selectEl.innerHTML = '';

        let activeCount = 0;

        Object.keys(layers).forEach(layerName => {
            const layer = layers[layerName];

            // Only list vector layers that are ACTIVE (checked on map)
            if (layer && map.hasLayer(layer) && typeof layer.toGeoJSON === 'function') {
                const option = document.createElement('option');
                option.value = layerName;
                option.textContent = layerName;
                selectEl.appendChild(option);
                activeCount++;
            }
        });

        if (activeCount === 0) {
            const defaultOpt = document.createElement('option');
            defaultOpt.value = '';
            defaultOpt.textContent = '-- No Active Overlay Selected --';
            selectEl.appendChild(defaultOpt);
        } else if (currentSelection && selectEl.querySelector(`option[value="${CSS.escape(currentSelection)}"]`)) {
            selectEl.value = currentSelection;
        }
    };

    // Populate dropdown on initial load
    updateTargetLayerDropdown();

    // Dynamically update dropdown whenever a user checks or unchecks a layer in the layer control
    map.on('overlayadd overlayremove', () => {
        updateTargetLayerDropdown();
    });

    let bufferResultLayer = null;

    // Run spatial analysis buffer calculation
    runBtn.addEventListener('click', () => {
        const selectedLayerName = selectEl.value;
        const distanceKm = parseFloat(document.getElementById('buffer-distance').value);

        if (!selectedLayerName || !layers[selectedLayerName]) {
            return alert('Please select a valid active target layer!');
        }

        const targetLayer = layers[selectedLayerName];

        try {
            const geojson = targetLayer.toGeoJSON();

            if (!geojson || (geojson.type === 'FeatureCollection' && geojson.features.length === 0)) {
                return alert('The selected layer has no vector features to analyze.');
            }

            // Run Turf.js Buffer
            const buffered = turf.buffer(geojson, distanceKm, { units: 'kilometers' });

            if (bufferResultLayer) {
                map.removeLayer(bufferResultLayer);
            }

            bufferResultLayer = L.geoJson(buffered, {
                style: { 
                    color: '#e53e3e', 
                    fillColor: '#feb2b2', 
                    fillOpacity: 0.4, 
                    weight: 2 
                }
            }).addTo(map);

            if (bufferResultLayer.getBounds().isValid()) {
                map.fitBounds(bufferResultLayer.getBounds());
            }

        } catch (error) {
            console.error('Error executing spatial buffer analysis:', error);
            alert('Could not compute buffer for this layer.');
        }
    });
}
