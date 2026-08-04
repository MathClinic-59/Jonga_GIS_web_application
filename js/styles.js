export const GISStyles = {
    roads: function(feature) {
        return { color: "#ff6600", weight: 2, opacity: 0.8 };
    },
    water: function(feature) {
        return { color: "#0077be", fillColor: "#3399ff", weight: 1, fillOpacity: 0.6 };
    },
    regions: function(feature) {
        return { color: "#800080", weight: 1.5, dashArray: "3, 3", fillOpacity: 0.1 };
    },
    railways: function(feature) {
        return { color: "#333333", weight: 2, dashArray: "6, 6" };
    },
    hospitals: function(feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 6,
            fillColor: "#28a745",
            color: "#000000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.85
        });
    }
};