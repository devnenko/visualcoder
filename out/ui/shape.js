import { boundingShape } from "./ui.js";
export var ERectType;
(function (ERectType) {
    ERectType["Normal"] = "normal";
    ERectType["HzBox"] = "hzbox";
    ERectType["VtBox"] = "vtbox";
})(ERectType || (ERectType = {}));
export class Shape {
    constructor(config) {
        this.zIndex = 10;
        this.parent = boundingShape;
        this.canvas = boundingShape.canvas;
        this.children = [];
        this.parent.children.push(this);
        boundingShape.allShapes.push(this);
        this.zIndex = this.parent.zIndex;
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
    setZIndex(index) {
        this.zIndex = index;
        for (const child of this.children) {
            child.setZIndex(index);
        }
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
    setIndex(index) {
        this.parent.children.splice(this.parent.children.indexOf(this), 1);
        this.parent.children.splice(index, 0, this);
    }
    draw(parent) {
        const sorted = this.children.slice().sort(function (a, b) {
            if (a.zIndex - b.zIndex != 0) {
            }
            return a.zIndex - b.zIndex;
        });
        for (const child of this.children) {
            child.draw(this);
        }
    }
    drawRect() {
    }
    destroy() {
        this.destroyChildrenOnly();
        this.parent.children.splice(this.parent.children.indexOf(this), 1);
        boundingShape.allShapes.splice(boundingShape.allShapes.indexOf(this), 1);
        boundingShape.draw();
    }
    destroyChildrenOnly() {
        const childLength = this.children.length;
        for (let i = 0; i < childLength; i++) {
            this.children[0].destroy();
        }
    }
}
