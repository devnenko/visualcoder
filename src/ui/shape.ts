import { boundingRect, BoundingRect } from "./bounding_rect.js";
import { Canvas } from "./canvas.js";


export abstract class Shape {

    protected parent: Shape | BoundingRect = boundingRect;
    protected children: Shape[] = [];
    public canvas: Canvas = boundingRect.canvas;
    private zIndex = 0;
    protected isVisible = true;

    constructor() {
        boundingRect.allShapes.push(this);
        this.sParent(this.parent);
        return this;
    }

    sVisible(isVisible: boolean) {
        this.isVisible = isVisible;
    }

    sParent(parent: Shape | BoundingRect) {
        const parentChidren = this.parent.getChildren();

        if (parentChidren.indexOf(this) != -1) {
            parentChidren.splice(this.parent.getChildren().indexOf(this), 1)
        }
        this.parent = parent;
        parent.getChildren().push(this);
        return this;
    }
    getParent() {
        return this.parent;
    }

    getCanvas() {
        return this.canvas;
    }

    sChildren(children: Shape[]) {
        this.children = children
        return this;
    }
    getChildren() {
        return this.children;
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

    sIndexInParent(index: number) {
        const parentChidren = this.parent.getChildren();

        parentChidren.splice(parentChidren.indexOf(this), 1)
        parentChidren.splice(index, 0, this);
        return this;
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
        const childLength = this.children.length;//cause they get removed with time

        for (let i = 0; i < childLength; i++) {
            this.children[0].destroy();
        }
        this.destroySelf();

    }

    destroySelf() {
        const parentChidren = this.parent.getChildren();

        parentChidren.splice(parentChidren.indexOf(this), 1);
        boundingRect.allShapes.splice(boundingRect.allShapes.indexOf(this), 1)
    }
}