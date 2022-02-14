//Ge = GameEngine
export class GeScript {
    constructor() {
        this.functions = [];
    }
}
export class GeFunction {
    constructor() {
        this.inObjs = [];
        this.outObjs = [];
        this.jsEquiv = 'console.log("ge function running")';
    }
}
export class GeObject {
}
export class GeString {
    constructor() {
        this.value = "empty string";
    }
}
export class GeFConsoleLog extends GeFunction {
    constructor() {
        super(...arguments);
        this.inObj = new GeString();
        this.jsEquiv = 'console.log(' + this.inObj.value + ')';
    }
}
