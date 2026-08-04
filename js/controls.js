export function setupControls(map, baseMaps, overlays) {
    L.control.layers(baseMaps, overlays, { collapsed: true, position: 'topright' }).addTo(map);
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);

    if (L.control.browserPrint) {
        L.control.browserPrint({
            title: 'Print Map',
            position: 'topleft',
            printModes: [
                L.BrowserPrint.Mode.Portrait(),
                L.BrowserPrint.Mode.Landscape(),
                L.BrowserPrint.Mode.Auto(),
                L.BrowserPrint.Mode.Custom()
            ]
        }).addTo(map);
    }
}