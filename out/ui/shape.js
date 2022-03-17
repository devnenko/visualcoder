import { boundingRect } from "./bounding_rect.js";
export class Shape {
    constructor() {
        this.parent = boundingRect;
        this.children = [];
        this.canvas = boundingRect.canvas;
        this.zIndex = 0;
        boundingRect.allShapes.push(this);
        this.setParent(this.parent);
        this.setZIndex(this.zIndex);
    }
    addConfig(config) {
        this.setConfigAttrs(config);
        boundingRect.draw();
    }
    setConfigAttrs(config) {
        if (config) {
            for (const opt in config) {
                this.setAttr(opt, config[opt]);
            }
        }
    }
    setAttr(key, value) {
        if (key === "parent") {
            this.setParent(value);
        }
        else if (key === "zIndex") {
            this.setZIndex(value);
        }
        // @ts-ignore: to ignore next line in ts
        this[key] = value;
    }
    getAttr(key) {
        // @ts-ignore: to ignore next line in ts
        return this[key];
    }
    setZIndex(index) {
        this.zIndex = index;
        for (const child of this.children) {
            child.addConfig({
                zIndex: this.zIndex
            });
        }
    }
    setParent(parent) {
        if (this.parent.children.indexOf(this) != -1) {
            this.parent.children.splice(this.parent.children.indexOf(this), 1);
        }
        parent.children.push(this);
    }
    assignChildrenToNew(newParent) {
        for (const child of this.children) {
            child.addConfig({
                parent: newParent
            });
        }
    }
    replace(newObj) {
        console.log("rep");
        console.log(this.children.length);
        console.log(this.children);
        const childrenLenght = this.children.length;
        for (var i = 0; i < childrenLenght; i++) {
            console.log("do");
            const obj = this.children[0];
            obj.addConfig({
                parent: newObj
            });
        }
        this.destroy();
    }
    setIndexInParent(index) {
        this.parent.children.splice(this.parent.children.indexOf(this), 1);
        this.parent.children.splice(index, 0, this);
        console.log("yeeehhh");
        console.log(this);
    }
    resize() {
        for (const child of this.children) {
            child.resize();
        }
    }
    draw() {
    }
    destroy() {
        this.destroyChildrenOnly();
        this.parent.children.splice(this.parent.children.indexOf(this), 1);
        boundingRect.allShapes.splice(boundingRect.allShapes.indexOf(this), 1);
        boundingRect.draw();
    }
    destroyChildrenOnly() {
        const childLength = this.children.length;
        for (let i = 0; i < childLength; i++) {
            this.children[0].destroy();
        }
    }
}
