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
        this.functionName = 'console.log("ge function running")'; //handle this in lib
    }
}
export class GeObject {
    constructor(name) {
        this.name = name;
    }
}
/*const obj=new GeObject()

const GeFConsoleLog=new GeFunction();
GeFConsoleLog.functionName="function to use in lib by name"
GeFConsoleLog.inObjs.push(new GeObject())*/
