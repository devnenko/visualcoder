import { Canvas } from "./canvas.js";
export class BoundingRect {
    constructor() {
        this.children = [];
        this.absEdges = { left: 0, right: 0, top: 0, bottom: 0 };
        this.canvas = new Canvas();
        this.allShapes = [];
    }
    draw() {
        //console.log("drawing scene")
        this.absEdges = { left: 0, right: window.innerWidth, top: 0, bottom: window.innerHeight };
        this.canvas.ctx.clearRect(this.absEdges.left, this.absEdges.top, this.absEdges.right, this.absEdges.bottom);
        for (const child of this.children) {
            child.resize();
        }
        this.setDrawOrder();
        for (var i = 0; i < this.allShapes.length; i++) {
            this.allShapes[i].draw();
        }
    }
    getChildren() {
        return this.children;
    }
    setDrawOrder() {
        this.allShapes.sort(function (a, b) {
            return a.gZIndex() - b.gZIndex(); //smaller number first
        });
    }
    destroy() {
        for (const child of this.children) {
            child.destroy();
        }
    }
}
const boundingRect = new BoundingRect();
//Object.freeze(boundingShape);
export { boundingRect };
