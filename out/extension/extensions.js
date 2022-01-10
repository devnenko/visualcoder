export class ExtensionManager {
    constructor() {
    }
    downloadExtension(src) {
    }
    loadExtension(uri) {
        var script = document.createElement("script");
        script.setAttribute("type", "module");
        script.setAttribute("src", uri);
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    ;
}
