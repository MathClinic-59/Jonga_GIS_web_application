export function addLegend(map) {
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'gis-legend');
        div.innerHTML = `
            <h4>Map Legend</h4>
            <div><i style="background: #ff6600"></i> Roads</div>
            <div><i style="background: #0077be"></i> Water Bodies</div>
            <div><i style="background: #28a745"></i> Hospitals</div>
            <div><i style="background: #333333"></i> Railways</div>
            <div><i style="background: #800080"></i> Regions</div>
        `;
        return div;
    };
    legend.addTo(map);
}