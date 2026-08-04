// js/dashboard.js

let chartInstance = null;

export function initDashboard(map, layers) {
    const ctx = document.getElementById('layerChart');
    if (!ctx || !window.Chart) return;

    // Create the initial chart
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'In-View Features',
                data: [],
                backgroundColor: [],
                borderWidth: 1
            }]
        },
        options: { 
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: { 
                y: { 
                    beginAtZero: true, 
                    title: { display: true, text: 'Features in Screen View' } 
                },
                x: { ticks: { font: { size: 10 } } }
            } 
        }
    });

    // Populate initial data and setup listeners
    updateDashboardChart(map, layers);
    setupRealtimeChartListeners(map, layers);
}

export function updateDashboardChart(map, layers) {
    if (!chartInstance) return;

    const activeLabels = [];
    const activeCounts = [];
    const mapBounds = map.getBounds(); // Get current viewport bounding box

    // Loop through registered overlay layers
    for (let key in layers) {
        const layer = layers[key];

        // Process only active/visible vector layers on the map
        if (layer && map.hasLayer(layer) && typeof layer.toGeoJSON === 'function') {
            activeLabels.push(key);

            let visibleCount = 0;

            // Iterate over individual sub-layers/features to test bounding box intersection
            if (layer.eachLayer) {
                layer.eachLayer(subLayer => {
                    // Check Points / Markers
                    if (subLayer.getLatLng && mapBounds.contains(subLayer.getLatLng())) {
                        visibleCount++;
                    } 
                    // Check Polygons / Polylines
                    else if (subLayer.getBounds && mapBounds.intersects(subLayer.getBounds())) {
                        visibleCount++;
                    }
                });
            }

            activeCounts.push(visibleCount);
        }
    }

    // Generate vibrant dynamic bar colors
    const bgColors = activeLabels.map((_, i) => `hsl(${(i * 360 / Math.max(activeLabels.length, 1))}, 70%, 50%)`);

    // Update Chart.js datasets
    chartInstance.data.labels = activeLabels;
    chartInstance.data.datasets[0].data = activeCounts;
    chartInstance.data.datasets[0].backgroundColor = bgColors;
    
    // Smoothly re-render chart without full UI reset
    chartInstance.update('none'); 
}

function setupRealtimeChartListeners(map, layers) {
    // 1. Update on layer check / uncheck toggles
    map.on('overlayadd overlayremove', () => {
        updateDashboardChart(map, layers);
    });

    // 2. Update when panning or zooming stops
    map.on('moveend zoomend', () => {
        updateDashboardChart(map, layers);
    });
}
