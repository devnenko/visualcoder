import { boundingShape } from "./ui.js";
export var ERectType;
(function (ERectType) {
    ERectType[ERectType["Normal"] = 0] = "Normal";
    ERectType[ERectType["HzBox"] = 1] = "HzBox";
    ERectType[ERectType["VtBox"] = 2] = "VtBox";
})(ERectType || (ERectType = {}));
export class Shape {
    constructor(config) {
        this.parent = boundingShape;
        this.canvas = boundingShape.canvas;
        this.children = [];
        this.parent.children.push(this);
        this.setAttrs(config);
    }
    addConfig(config) {
        this.setAttrs(config);
        boundingShape.draw();
    }
    setAttrs(config) {
        if (config) {
            for (const opt in config) {
                //if (Object.prototype.hasOwnProperty.call(config, opt)) {
                //    this.setAttr(opt, config[opt])
                //}
                this.setAttr(opt, config[opt]);
            }
        }
    }
    setAttr(key, value) {
        if (key === "parent") {
            this.setParent(value); //why val.parent????
        }
        // @ts-ignore
        this[key] = value;
    }
    getAttr(key) {
        // @ts-ignore
        return this[key];
    }
    //public createConfig(opts:Opts){
    //    this.addConfig(opts)
    //}
    //
    //protected addConfig(opts: any) {
    //    for (const opt in opts) {
    //        if (Object.prototype.hasOwnProperty.call(opts, opt)) {
    //            this.setConfigAttr(opt as keyof Opts, opts[opt])
    //        }
    //    }
    //    //boundingShape.draw();
    //}
    //public setConfigAttr(key: keyof Opts, val: any) {
    //
    //    if (val === undefined || val === null) {
    //        delete this[key as keyof IShapeConfig];
    //    }
    //    else if (key==="parent") {
    //        this.setParent(val as IShape);//why val.parent????
    //    }
    //    else {
    //        this[key as keyof IShapeConfig] = val;
    //    }
    //}
    //
    //private getConfigAttr(key: keyof IShapeConfig) {
    //    return this[key];
    //}
    setParent(parent) {
        this.parent.children.splice(this.parent.children.indexOf(this), 1);
        parent.children.push(this);
        boundingShape.draw();
    }
    draw(parent) {
        for (const child of this.children) {
            child.draw(this);
        }
    }
    destroy() {
        this.destroyChildrenOnly();
        this.parent.children.splice(this.parent.children.indexOf(this), 1);
    }
    destroyChildrenOnly() {
        const childLength = this.children.length;
        for (let i = 0; i < childLength; i++) {
            this.children[0].destroy();
        }
    }
}
