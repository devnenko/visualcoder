import { Canvas } from "./canvas.js";
import { EObjectType } from "./shape.js";
export class BoundingShape {
    constructor() {
        this.children = [];
        this.absEdges = { left: 0, right: 0, top: 0, bottom: 0 };
        this.type = EObjectType.Normal;
        this.canvas = new Canvas();
    }
    draw() {
        this.absEdges = { left: 0, right: window.innerWidth, top: 0, bottom: window.innerHeight };
        this.canvas.ctx.clearRect(this.absEdges.left, this.absEdges.top, this.absEdges.right, this.absEdges.bottom);
        for (const child of this.children) {
            child.draw(this);
        }
    }
    destroy() {
        for (const child of this.children) {
            child.destroy();
        }
    }
    getAbsSize() {
        return { w: this.absEdges.right - this.absEdges.left, h: this.absEdges.bottom - this.absEdges.top };
    }
}
const boundingShape = new BoundingShape();
//Object.freeze(boundingShape);
export { boundingShape };
