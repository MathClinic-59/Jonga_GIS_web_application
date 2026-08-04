// js/layers.js
import { CONFIG } from './config.js';
import { GISStyles } from './styles.js';
import { bindFeaturePopup } from './popup.js';

export function loadOverlayLayers() {
    const layers = {};

    // 1. Root Datasets
    if (typeof healthfacility !== 'undefined') {
        layers["Health Facilities"] = L.geoJson(healthfacility, { 
            pointToLayer: GISStyles.hospitals, 
            onEachFeature: bindFeaturePopup 
        });
    }
    if (typeof railway !== 'undefined') {
        layers["Railways"] = L.geoJson(railway, { 
            style: GISStyles.railways, 
            onEachFeature: bindFeaturePopup 
        });
    }
    if (typeof region !== 'undefined') {
        layers["Regions"] = L.geoJson(region, { 
            style: GISStyles.regions, 
            onEachFeature: bindFeaturePopup 
        });
    }

    // 2. data/zaf_data/ Datasets
    if (typeof road_zaf !== 'undefined') {
        layers["South African Roads"] = L.geoJson(road_zaf, { 
            style: GISStyles.roads, 
            onEachFeature: bindFeaturePopup 
        });
    }
    if (typeof water_zaf !== 'undefined') {
        layers["South African Water Bodies"] = L.geoJson(water_zaf, { 
            style: GISStyles.water, 
            onEachFeature: bindFeaturePopup 
        });
    }
    if (typeof river_zaf !== 'undefined') {
        layers["Rivers (Vector)"] = L.geoJson(river_zaf, { 
            style: GISStyles.riversVector, 
            onEachFeature: bindFeaturePopup 
        });
    }

    const wardData = typeof south_africa_Ward_level_4 !== 'undefined' ? south_africa_Ward_level_4 : (typeof ward_level_4 !== 'undefined' ? ward_level_4 : undefined);
    if (wardData) {
        layers["Ward Level 4 Boundaries"] = L.geoJson(wardData, { 
            style: GISStyles.wards, 
            onEachFeature: bindFeaturePopup 
        });
    }

    // ➕ Included Administrative Boundaries (zaf_admin.js)
    if (typeof zaf_admin !== 'undefined') {
        layers["Administrative Boundaries"] = L.geoJson(zaf_admin, { 
            style: GISStyles.adminBoundaries, 
            onEachFeature: bindFeaturePopup 
        });
    }

    // 3. GeoServer WMS Layer
    layers["Rivers (GeoServer WMS)"] = L.tileLayer.wms(CONFIG.geoserver.wmsUrl, {
        layers: `${CONFIG.geoserver.workspace}:rivers`,
        format: 'image/png',
        transparent: true,
        attribution: "GeoServer Rivers"
    });

    return layers;
}
