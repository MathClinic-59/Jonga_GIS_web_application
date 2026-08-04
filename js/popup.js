export function bindFeaturePopup(feature, layer) {
    if (!feature.properties) return;

    let props = feature.properties;
    let title = props.name || props.Facility_Name || props.region || props.NAME || "Feature Information";
    
    let html = `<div class="popup-title">${title}</div>`;
    html += `<table class="gis-popup-table">`;

    for (let key in props) {
        if (props.hasOwnProperty(key)) {
            html += `<tr><th>${key}</th><td>${props[key]}</td></tr>`;
        }
    }
    
    html += `</table>`;
    layer.bindPopup(html);
}