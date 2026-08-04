export function setupAttributeTable(layers) {
    const openBtn = document.getElementById('btn-open-attribute-table');
    const closeBtn = document.getElementById('close-modal');
    const modal = document.getElementById('attribute-modal');
    const container = document.getElementById('attribute-table-container');

    if (!openBtn || !modal) return;

    openBtn.addEventListener('click', () => {
        const hospitalLayer = layers["Health Facilities"];
        if (!hospitalLayer) {
            container.innerHTML = "<p>No layer available for tabular display.</p>";
            modal.style.display = 'block';
            return;
        }

        const geojson = hospitalLayer.toGeoJSON();
        if (!geojson.features || geojson.features.length === 0) {
            container.innerHTML = "<p>Layer contains no features.</p>";
            modal.style.display = 'block';
            return;
        }

        let tableHtml = `<table class="gis-popup-table" style="width:100%;"><thead><tr>`;
        const sampleProps = geojson.features[0].properties;

        for (let key in sampleProps) tableHtml += `<th>${key}</th>`;
        tableHtml += `</tr></thead><tbody>`;

        geojson.features.slice(0, 50).forEach(f => {
            tableHtml += `<tr>`;
            for (let key in sampleProps) tableHtml += `<td>${f.properties[key] || ''}</td>`;
            tableHtml += `</tr>`;
        });

        tableHtml += `</tbody></table>`;
        container.innerHTML = tableHtml;
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
}