export var FileTypes;
(function (FileTypes) {
    FileTypes["image"] = "image";
    FileTypes["script"] = "script";
})(FileTypes || (FileTypes = {}));
export class CBFile {
    constructor(name, type, source) {
        this.name = name;
        this.type = type;
        this.src = source;
        this.onChangeSrc = () => { console.log("scr changed"); };
    }
}
export let allFiles = [];