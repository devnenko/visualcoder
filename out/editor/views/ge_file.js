export class GeFile {
    constructor(name, type, source) {
        this.name = name;
        this.type = type;
        this.src = source;
        this.onChangeSrc = () => { console.log("scr changed"); };
    }
}
export let allFiles = [];
