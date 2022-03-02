export var FileTypes;
(function (FileTypes) {
    FileTypes["image"] = "image";
    FileTypes["script"] = "script";
    FileTypes["level"] = "level";
})(FileTypes || (FileTypes = {}));
export class CBFile {
    constructor(name, type, source) {
        this.linkedObjects = [];
        this.name = name;
        this.type = type;
        this.src = source;
        this.onChangeSrc = () => { console.log("scr changed"); };
    }
    static getStartLevel() {
    }
    destroy() {
        this.linkedObjects.forEach;
        removeref;
    }
}
export let allFiles = [];
export let mapStartFile = new CBFile("Entry", FileTypes.level, "");
export function setMapStartFile(file) {
    mapStartFile = file;
}
allFiles.push(mapStartFile);
