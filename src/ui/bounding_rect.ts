

import { stats } from "../main.js";
import { Canvas } from "./canvas.js";
import { KeypressHandler } from "./event_handlers/keypress.js";
import { MouseHandler } from "./event_handlers/mouse.js";
import { Rect } from "./rect.js";
import { ERectType, IShape } from "./shape.js";
import { EConstraintsX, EConstraintsY } from "./types/constraints.js";
import { IEdges } from "./types/edges.js";
import { IPos } from "./types/pos.js";
import { ITransform } from "./types/transform.js";

export class BoundingRect implements IShape {
    public children: IShape[] = [];
    public absEdges:IEdges = { left: 0, right: 0, top: 0, bottom: 0 };
    public rectType: ERectType = ERectType.Normal;
    public canvas = new Canvas();
    public drawAmounts=0;
    public zIndex=0;
    public allShapes:IShape[]=[];
    constructor() {
    }

    draw() {
        stats.begin();
        this.drawAmounts=this.drawAmounts+1;
        //console.log("bounding Shape Draw: "+this.drawAmounts)
        this.absEdges = { left: 0, right: window.innerWidth, top: 0, bottom: window.innerHeight }
        this.canvas.ctx.clearRect(this.absEdges.left, this.absEdges.top, this.absEdges.right, this.absEdges.bottom);
        for (const child of this.children) {
            child.draw(this);
        }

        this.drawOrder();
        stats.end();
    }

    private drawOrder(){
        this.allShapes.sort(function(a, b){
            return a.zIndex - b.zIndex //smaller number first
        })

        for(const shape of this.allShapes){
            shape.drawRect();
        }
    }
    drawRect(){

    };

    setZIndex(index:number){
        this.zIndex=index;
        for (const child of this.children) {
            child.setZIndex(index);
        }
    }

    destroy() {
        for (const child of this.children) {
            child.destroy();
        }
    }

    getAbsSize(){
        return {w:this.absEdges.right-this.absEdges.left,h:this.absEdges.bottom-this.absEdges.top};
    }
}

const boundingShape = new BoundingRect();
//Object.freeze(boundingShape);

export { boundingShape };