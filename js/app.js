// js/app.js
import { initMap } from './map.js';
import { getBaseMaps } from './basemaps.js';
import { loadOverlayLayers } from './layers.js';
import { setupControls } from './controls.js';
import { addLegend } from './legend.js';
import { setupSpatialAnalysis } from './spatialAnalysis.js';
import { initDashboard } from './dashboard.js';
import { setupAttributeTable } from './attributeTable.js';

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Leaflet Map
    const map = initMap();

    // 2. Load Basemaps & Overlays (including root & data/zaf_data/ layers)
    const baseMaps = getBaseMaps();
    baseMaps["OpenStreetMap"].addTo(map);
    const overlays = loadOverlayLayers();

    // 3. Initialize Controls & Extensions
    setupControls(map, baseMaps, overlays); // Collapsed layer menu
    addLegend(map);
    
    // 4. Connect Dynamic GIS Modules
    setupSpatialAnalysis(map, overlays);   // Dropdown populated with all vector layers
    initDashboard(map, overlays);          // Live Chart.js viewport counts
    setupAttributeTable(map, overlays);    // Live viewport spatial attribute reader
});

// Inside js/app.js
const mapControls = setupControls(map, baseMaps, overlays);
