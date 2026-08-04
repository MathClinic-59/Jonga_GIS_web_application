// js/app.js
import { initMap } from './map.js';
import { getBaseMaps } from './basemaps.js';
import { loadOverlayLayers } from './layers.js';
import { setupControls } from './controls.js';
import { addLegend } from './legend.js';
import { setupSpatialAnalysis } from './spatialAnalysis.js';
import { initDashboard } from './dashboard.js';
import { toggleSidebarLogic } from './charts.js';
import { setupAttributeTable } from './attributeTable.js';

document.addEventListener("DOMContentLoaded", () => {
    const map = initMap();
    const baseMaps = getBaseMaps();
    baseMaps["OpenStreetMap"].addTo(map);

    const overlays = loadOverlayLayers();

    setupControls(map, baseMaps, overlays);
    addLegend(map);
    setupSpatialAnalysis(map, overlays);

    // Initialize Dashboard & Attribute Data Viewer with dynamic viewport sync
    initDashboard(map, overlays);
    setupAttributeTable(map, overlays);

    toggleSidebarLogic();
});
