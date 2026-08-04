// js/spatialAnalysis.js

export function setupSpatialAnalysis(map, layers) {
    const layerSelect = document.getElementById('analysis-layer-select');
    const distanceInput = document.getElementById('buffer-distance');
    const runBtn = document.getElementById('btn-run-analysis');
    const clearBtn = document.getElementById('btn-clear-analysis');

    if (!layerSelect || !runBtn) return;

    // Populates dropdown with ALL available vector overlay layers
    const populateLayerDropdown = () => {
        layerSelect.innerHTML = '<option value="">-- Select Layer --</option>';

        for (let key in layers) {
            const layer = layers[key];
            
            // Check if layer exists and is a vector GeoJSON layer (excluding WMS tiles)
            if (layer && typeof layer.toGeoJSON === 'function') {
                const opt = document.createElement('option');
                opt.value = key;
                opt.textContent = key;
                layerSelect.appendChild(opt);
            }
        }
    };

    populateLayerDropdown();

    // Store buffer analysis layer reference for cleanup
    let analysisGroup = L.featureGroup().addTo(map);

    // Run Buffer Analysis using Turf.js
    runBtn.addEventListener('click', () => {
        const selectedKey = layerSelect.value;
        const distance = parseFloat(distanceInput ? distanceInput.value : 5);

        if (!selectedKey || !layers[selectedKey]) {
            alert('Please select a valid vector layer to analyze.');
            return;
        }

        analysisGroup.clearLayers();
        const selectedLayer = layers[selectedKey];
        const geojsonData = selectedLayer.toGeoJSON();

        try {
            // Perform Turf.js buffer (in kilometers)
            const buffered = turf.buffer(geojsonData, distance, { units: 'kilometers' });

            const bufferLeafletLayer = L.geoJson(buffered, {
                style: {
                    color: '#e11d48',
                    fillColor: '#f43f5e',
                    fillOpacity: 0.35,
                    weight: 2,
                    dashArray: '4, 4'
                }
            });

            bufferLeafletLayer.addTo(analysisGroup);
            map.fitBounds(bufferLeafletLayer.getBounds());

        } catch (err) {
            console.error("Spatial Analysis Error:", err);
            alert("Could not complete buffer analysis on the selected dataset.");
        }
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            analysisGroup.clearLayers();
        });
    }
}
