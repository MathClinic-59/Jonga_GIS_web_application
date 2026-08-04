import { initMap } from './map.js';
import { getBaseMaps } from './basemaps.js';
import { loadOverlayLayers } from './layers.js';
import { setupControls } from './controls.js';
import { addLegend } from './legend.js';
import { setupSearch } from './search.js';
import { setupRouting } from './measure.js';
import { setupDrawTools } from './draw.js';
import { setupSpatialAnalysis } from './spatialAnalysis.js';
import { initDashboard } from './dashboard.js';
import { toggleSidebarLogic } from './charts.js';
import { setupAttributeTable } from './attributeTable.js';

document.addEventListener("DOMContentLoaded", () => {
    const map = initMap();
    const baseMaps = getBaseMaps();
    baseMaps["OpenStreetMap"].addTo(map);

    const overlays = loadOverlayLayers();

    if (overlays["South African Roads"]) overlays["South African Roads"].addTo(map);
    if (overlays["Health Facilities"]) overlays["Health Facilities"].addTo(map);

    setupControls(map, baseMaps, overlays);
    addLegend(map);

    if (overlays["Health Facilities"]) {
        setupSearch(map, overlays["Health Facilities"]);
    }

    setupRouting(map);
    const drawnItems = setupDrawTools(map);
    setupSpatialAnalysis(map, overlays);

    initDashboard(overlays);
    toggleSidebarLogic();
    setupAttributeTable(overlays);

    document.getElementById('btn-export-geojson').addEventListener('click', () => {
        const data = drawnItems.toGeoJSON();
        const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", jsonStr);
        downloadAnchor.setAttribute("download", "drawn_features.geojson");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    });
});