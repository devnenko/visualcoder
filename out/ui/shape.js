import { boundingShape } from "./ui.js";
export var EObjectType;
(function (EObjectType) {
    EObjectType[EObjectType["Normal"] = 0] = "Normal";
    EObjectType[EObjectType["HzBox"] = 1] = "HzBox";
    EObjectType[EObjectType["VtBox"] = 2] = "VtBox";
})(EObjectType || (EObjectType = {}));
export class Shape {
    constructor() {
        this.parent = boundingShape;
        this.canvas = boundingShape.canvas;
        this.children = [];
        this.parent.children.push(this);
    }
    createConfig(opts) {
        this.addConfig(opts);
    }
    addConfig(opts) {
        for (const opt in opts) {
            if (Object.prototype.hasOwnProperty.call(opts, opt)) {
                this.setConfigAttr(opt, opts[opt]);
            }
        }
        //boundingShape.draw();
    }
    setConfigAttr(key, val) {
        if (val === undefined || val === null) {
            delete this[key];
        }
        else if (key === "parent") {
            this.setParent(val); //why val.parent????
        }
        else {
            this[key] = val;
        }
    }
    getConfigAttr(key) {
        return this[key];
    }
    setParent(parent) {
        this.parent.children.splice(this.parent.children.indexOf(this), 1);
        parent.children.push(this);
        this.parent = parent;
    }
    draw(parent) {
        for (const child of this.children) {
            child.draw(this);
        }
    }
    destroy() {
        const len = this.children.length;
        for (let i = 0; i < len; i++) {
            this.children[0].destroy();
        }
        this.parent.children.splice(this.parent.children.indexOf(this), 1);
    }
}
