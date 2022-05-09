import { boundingRect } from "./bounding_rect.js";
export class Shape {
    constructor() {
        this.parent = boundingRect; //for override in parent classes
        this.children = []; //for override in parent classes
        this.canvas = boundingRect.canvas;
        this.zIndex = 0;
        this.isVisible = true;
        boundingRect.allShapes.push(this);
        this.sParent(this.parent);
    }
    sIsVisible(isVisible) {
        this.isVisible = isVisible;
        return this;
    }
    gIsVisible() {
        return this.isVisible;
    }
    sParent(parent) {
        const parentChidren = this.parent.gChildren();
        if (parentChidren.indexOf(this) != -1) {
            this.parent.spliceChild(this);
        }
        this.parent = parent;
        parent.pushChild(this);
        return this;
    }
    gParent() {
        return this.parent;
    }
    sCanvas(canvas) {
        this.canvas = canvas;
    }
    gCanvas() {
        return this.canvas;
    }
    sChildren(children) {
        this.children = children;
        return this;
    }
    gChildren() {
        return this.children;
    }
    pushChild(child) {
        this.children.push(child);
    }
    spliceChild(child) {
        this.children.splice(this.children.indexOf(child), 1);
    }
    sZIndex(index) {
        this.zIndex = index;
        for (const child of this.children) {
            child.sZIndex(this.zIndex);
        }
        return this;
    }
    gZIndex() {
        return this.zIndex;
    }
    gIndexInParent() {
        return this.gParent().gChildren().indexOf(this);
    }
    replace(newObj) {
        newObj.sParent(this.parent);
        const childrenLenght = this.children.length;
        for (var i = 0; i < childrenLenght; i++) {
            const obj = this.children[0];
            obj.sParent(newObj);
        }
        this.destroySelf();
    }
    popOut() {
        const childrenLenght = this.children.length;
        for (var i = 0; i < childrenLenght; i++) {
            const obj = this.children[0];
            obj.sParent(this.parent);
        }
        this.destroySelf();
    }
    indexInParent(index) {
        const parentChidren = this.parent.gChildren();
        parentChidren.splice(parentChidren.indexOf(this), 1);
        parentChidren.splice(index, 0, this);
        return this;
    }
    resAndDraw() {
        this.resize();
        this.draw();
    }
    resAndDrawSelf() {
        this.resizeSelf();
        //no drawing yet
    }
    draw() {
    }
    resize() {
        this.resizeSelf();
        for (const child of this.children) {
            child.resize();
        }
    }
    resizeSelf() {
    }
    destroy() {
        this.destroyChildren();
        this.destroySelf();
    }
    destroyChildren() {
        const childLength = this.children.length; //cause they get removed with time
        for (let i = 0; i < childLength; i++) {
            this.children[0].destroy();
        }
    }
    destroySelf() {
        const parentChidren = this.parent.gChildren();
        parentChidren.splice(parentChidren.indexOf(this), 1);
        boundingRect.allShapes.splice(boundingRect.allShapes.indexOf(this), 1);
    }
}
