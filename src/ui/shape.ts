import { boundingRect, BoundingRect } from "./bounding_rect.js";
import { Canvas } from "./canvas.js";


export abstract class Shape {

    protected parent: Shape | BoundingRect = boundingRect;//for override in parent classes
    protected children: Shape[] = [];//for override in parent classes
    private canvas: Canvas = boundingRect.canvas;
    private zIndex = 0;
    private isVisible = true;

    constructor() {
        boundingRect.allShapes.push(this);
        this.sParent(this.parent);
    }

    sIsVisible(isVisible: boolean) {
        this.isVisible = isVisible;
        return this;
    }

    gIsVisible(){
        return this.isVisible;
    }


    sParent(parent: Shape | BoundingRect) {
        const parentChidren = this.parent.gChildren();

        if (parentChidren.indexOf(this) != -1) {
            this.parent.spliceChild(this)
        }
        this.parent = parent;
        parent.pushChild(this);
        return this;
    }
    gParent() {
        return this.parent;
    }

    sCanvas(canvas:Canvas){
        this.canvas=canvas;
    }

    gCanvas() {
        return this.canvas;
    }

    sChildren(children: Shape[]) {
        this.children = children
        return this;
    }
    gChildren() {
        return this.children;
    }
    pushChild(child:Shape){
        this.children.push(child);
    }
    spliceChild(child:Shape){
        this.children.splice(this.children.indexOf(child),1)
    }

    sZIndex(index: number) {
        this.zIndex = index;
        for (const child of this.children) {
            child.sZIndex(this.zIndex);
        }
        return this;
    }

    gZIndex() {
        return this.zIndex;
    }

    gIndexInParent(){
        return this.gParent().gChildren().indexOf(this);
    }

    replace(newObj: Shape) {
        newObj.sParent(this.parent);
        const childrenLenght = this.children.length;
        for (var i = 0; i < childrenLenght; i++) {
            const obj = this.children[0]
            obj.sParent(newObj);
        }
        this.destroySelf();
    }

    popOut() {
        const childrenLenght = this.children.length;
        for (var i = 0; i < childrenLenght; i++) {
            const obj = this.children[0]
            obj.sParent(this.parent)
        }
        this.destroySelf();
    }

    indexInParent(index: number) {
        const parentChidren = this.parent.gChildren();

        parentChidren.splice(parentChidren.indexOf(this), 1)
        parentChidren.splice(index, 0, this);
        return this;
    }

    resAndDraw() {
        this.resize();
        this.draw();
    }

    resAndDrawSelf(){
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
        boundingRect.draw();
    }

    destroyChildren(){
        const childLength = this.children.length;//cause they get removed with time

        for (let i = 0; i < childLength; i++) {
            this.children[0].destroy();
        }
    }

    destroySelf() {
        const parentChidren = this.parent.gChildren();

        parentChidren.splice(parentChidren.indexOf(this), 1);
        boundingRect.allShapes.splice(boundingRect.allShapes.indexOf(this), 1)
    }
}