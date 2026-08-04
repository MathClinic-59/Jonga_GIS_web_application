// js/controls.js

/**
 * Configures base layers, overlay controls, and scale for Jonga GIS.
 * 
 * @param {L.Map} map - Active Leaflet map instance.
 * @param {Object} baseMaps - Dictionary of tile basemaps.
 * @param {Object} overlays - Dictionary of vector and WMS layers (including zaf_data).
 * @returns {Object} Object containing references to initialized Leaflet controls.
 */
export function setupControls(map, baseMaps, overlays) {
    if (!map) {
        console.error("[JongaGIS] setupControls: Leaflet map instance is missing.");
        return {};
    }

    const controls = {};

    // 1. Add Basemap and Overlay Control (Collapsed by default, top-right)
    controls.layers = L.control.layers(baseMaps, overlays, { 
        collapsed: true, // Keeps the layer menu neatly folded until hovered/clicked
        position: 'topright'
    }).addTo(map);

    // 2. Add Scale Control (Metric only, bottom-left)
    controls.scale = L.control.scale({
        imperial: false,
        metric: true,
        position: 'bottomleft'
    }).addTo(map);

    return controls;
}
