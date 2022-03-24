import { IEdges } from "../util/transform.js";
import { Canvas } from "./canvas.js";
import { Shape} from "./shape.js";

export class BoundingRect {

    public children: Shape[] = [];

    public absEdges:IEdges = { left: 0, right: 0, top: 0, bottom: 0 };
    public canvas = new Canvas();
    public allShapes:Shape[]=[];
    constructor() {
    }

    draw() {

        this.absEdges = { left: 0, right: window.innerWidth, top: 0, bottom: window.innerHeight }
        this.canvas.ctx.clearRect(this.absEdges.left, this.absEdges.top, this.absEdges.right, this.absEdges.bottom);

        for (const child of this.children) {
            child.resize();
        }

        this.setDrawOrder();

        for(var i=0;i<this.allShapes.length;i++){
            this.allShapes[i].draw();
        }
    }

    private setDrawOrder(){
        this.allShapes.sort(function(a, b){
            return a.zIndex - b.zIndex //smaller number first
        })
    }

    destroy() {
        for (const child of this.children) {
            child.destroySelfAndChildren();
        }
    }
}

const boundingRect = new BoundingRect();
//Object.freeze(boundingShape);

export { boundingRect};