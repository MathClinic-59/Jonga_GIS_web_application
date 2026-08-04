export function initDashboard(layers) {
    const ctx = document.getElementById('layerChart');
    if (!ctx || !window.Chart) return;

    const layerNames = [];
    const featureCounts = [];

    for (let key in layers) {
        if (layers[key].toGeoJSON) {
            layerNames.push(key);
            const data = layers[key].toGeoJSON();
            featureCounts.push(data.features ? data.features.length : 0);
        }
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: layerNames,
            datasets: [{
                label: 'Feature Count',
                data: featureCounts,
                backgroundColor: 'rgba(43, 108, 176, 0.7)',
                borderColor: 'rgba(26, 54, 93, 1)',
                borderWidth: 1
            }]
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
}