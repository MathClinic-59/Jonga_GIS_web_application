// js/attributeTable.js

export function setupAttributeTable(map, layers) {
    const openBtn = document.getElementById('btn-open-attribute-table');
    const closeBtn = document.getElementById('close-modal');
    const modal = document.getElementById('attribute-modal');
    const container = document.getElementById('attribute-table-container');

    if (!openBtn || !modal || !container) return;

    // Helper to render visible feature records
    const renderTable = () => {
        container.innerHTML = "";
        const mapBounds = map.getBounds();
        let totalVisibleFeatures = [];

        // Collect visible features across all active vector layers
        for (let key in layers) {
            const layer = layers[key];
            
            // Process only layers visible on map
            if (layer && map.hasLayer(layer) && layer.eachLayer) {
                layer.eachLayer(subLayer => {
                    let isVisible = false;

                    if (subLayer.getLatLng && mapBounds.contains(subLayer.getLatLng())) {
                        isVisible = true;
                    } else if (subLayer.getBounds && mapBounds.intersects(subLayer.getBounds())) {
                        isVisible = true;
                    }

                    if (isVisible && subLayer.feature && subLayer.feature.properties) {
                        totalVisibleFeatures.push({
                            layerName: key,
                            properties: subLayer.feature.properties
                        });
                    }
                });
            }
        }

        if (totalVisibleFeatures.length === 0) {
            container.innerHTML = "<p style='padding:10px;'>No vector features currently visible in the current viewport.</p>";
            return;
        }

        // Build HTML Table
        let tableHtml = `
            <div style="margin-bottom: 8px; font-weight: bold; color: #4a5568;">
                Showing ${totalVisibleFeatures.length} visible feature(s) on screen
            </div>
            <table class="gis-popup-table" style="width:100%;">
                <thead>
                    <tr>
                        <th>Source Layer</th>
        `;

        // Gather sample headers from the first visible feature
        const sampleProps = totalVisibleFeatures[0].properties;
        for (let propName in sampleProps) {
            tableHtml += `<th>${propName}</th>`;
        }
        tableHtml += `</tr></thead><tbody>`;

        // Limit display to first 100 features for optimal performance
        totalVisibleFeatures.slice(0, 100).forEach(item => {
            tableHtml += `<tr><td><strong>${item.layerName}</strong></td>`;
            for (let propName in sampleProps) {
                const val = item.properties[propName];
                tableHtml += `<td>${val !== undefined && val !== null ? val : ''}</td>`;
            }
            tableHtml += `</tr>`;
        });

        tableHtml += `</tbody></table>`;
        container.innerHTML = tableHtml;
    };

    // Open Modal and render table
    openBtn.addEventListener('click', () => {
        renderTable();
        modal.style.display = 'block';
    });

    // Close Modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Auto-update modal table when panning/zooming if modal is currently open
    map.on('moveend zoomend overlayadd overlayremove', () => {
        if (modal.style.display === 'block') {
            renderTable();
        }
    });
}
