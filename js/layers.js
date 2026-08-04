import { CONFIG } from './config.js';
import { GISStyles } from './styles.js';
import { bindFeaturePopup } from './popup.js';

export function loadOverlayLayers() {
    const layers = {};

    if (typeof road_zaf !== 'undefined') {
        layers["South African Roads"] = L.geoJson(road_zaf, { style: GISStyles.roads, onEachFeature: bindFeaturePopup });
    }
    if (typeof water_zaf !== 'undefined') {
        layers["South African Water Bodies"] = L.geoJson(water_zaf, { style: GISStyles.water, onEachFeature: bindFeaturePopup });
    }
    if (typeof healthfacility !== 'undefined') {
        layers["Health Facilities"] = L.geoJson(healthfacility, { pointToLayer: GISStyles.hospitals, onEachFeature: bindFeaturePopup });
    }
    if (typeof railway !== 'undefined') {
        layers["Railways"] = L.geoJson(railway, { style: GISStyles.railways, onEachFeature: bindFeaturePopup });
    }
    if (typeof region !== 'undefined') {
        layers["Regions"] = L.geoJson(region, { style: GISStyles.regions, onEachFeature: bindFeaturePopup });
    }

    layers["Rivers (GeoServer WMS)"] = L.tileLayer.wms(CONFIG.geoserver.wmsUrl, {
        layers: `${CONFIG.geoserver.workspace}:rivers`,
        format: 'image/png',
        transparent: true,
        attribution: "GeoServer Rivers"
    });

    return layers;
}