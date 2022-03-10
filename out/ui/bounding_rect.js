import { stats } from "../main.js";
import { Canvas } from "./canvas.js";
import { ERectType } from "./shape.js";
export class BoundingRect {
    constructor() {
        this.children = [];
        this.absEdges = { left: 0, right: 0, top: 0, bottom: 0 };
        this.rectType = ERectType.Normal;
        this.canvas = new Canvas();
        this.drawAmounts = 0;
        this.zIndex = 0;
        this.allShapes = [];
    }
    draw() {
        stats.begin();
        this.drawAmounts = this.drawAmounts + 1;
        //console.log("bounding Shape Draw: "+this.drawAmounts)
        this.absEdges = { left: 0, right: window.innerWidth, top: 0, bottom: window.innerHeight };
        this.canvas.ctx.clearRect(this.absEdges.left, this.absEdges.top, this.absEdges.right, this.absEdges.bottom);
        for (const child of this.children) {
            child.draw(this);
        }
        this.drawOrder();
        stats.end();
    }
    drawOrder() {
        this.allShapes.sort(function (a, b) {
            return a.zIndex - b.zIndex; //smaller number first
        });
        for (const shape of this.allShapes) {
            shape.drawRect();
        }
    }
    drawRect() {
    }
    ;
    setZIndex(index) {
        this.zIndex = index;
        for (const child of this.children) {
            child.setZIndex(index);
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
const boundingShape = new BoundingRect();
//Object.freeze(boundingShape);
export { boundingShape };
