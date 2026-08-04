// js/app.js
import { initMap } from './map.js';
import { getBaseMaps } from './basemaps.js';
import { loadOverlayLayers } from './layers.js';
import { setupControls } from './controls.js';
import { addLegend } from './legend.js';
import { setupSpatialAnalysis } from './spatialAnalysis.js';
import { initDashboard } from './dashboard.js';
import { toggleSidebarLogic } from './charts.js';

document.addEventListener("DOMContentLoaded", () => {
    const map = initMap();
    const baseMaps = getBaseMaps();
    baseMaps["OpenStreetMap"].addTo(map);

    // Load overlays
    const overlays = loadOverlayLayers();

    // Setup map controls
    setupControls(map, baseMaps, overlays);
    addLegend(map);
    setupSpatialAnalysis(map, overlays);

    // Initialize Real-Time Dashboard (passing both map and overlays)
    initDashboard(map, overlays);

    toggleSidebarLogic();
});
