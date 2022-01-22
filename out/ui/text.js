import { Rect } from "./rect.js";
export class Text {
    constructor(parent, canvas) {
        this.discriminator1 = 'IShape';
        this.children = [];
        //additional display options 
        this.isVisible = true;
        this.color = "pink";
        this.text = "Empty Text";
        this.size = 25;
        this.absEdges = { left: 0, right: 0, top: 0, bottom: 0 };
        this.parentSize = { left: 0, right: 0, top: 0, bottom: 0 };
        this.parentSize = parent.absEdges;
        this.parent = parent;
        parent.children.push(this); //set this as a child of parent to create an object tree
        this.canvas = canvas;
    }
    destroy() {
        this.parent.children.splice(this.parent.children.indexOf(this), 1);
    }
    overlappHierarchy(pos) {
        let all = [];
        for (const child of this.children) {
            all = all.concat(child.overlappHierarchy(pos));
        }
        return all;
    }
    //public checkOverlapp(pos:IPos):Button[] {
    //    let all:Button[]=[];
    //    for (const child of this.children){
    //        all=all.concat(child.checkOverlapp(pos) as Button[])
    //    }
    //    all=all.slice().reverse();
    //    return all;
    //}
    draw() {
        if (this.isVisible == true) {
            const transform = this.edgesToDrawdimensions(this.absEdges);
            this.canvas.ctx.textAlign = "start";
            this.canvas.ctx.fillStyle = this.color;
            this.canvas.ctx.font = this.size + "px Arial";
            this.canvas.ctx.fillText(this.text, transform.pos.x, transform.pos.y + this.size);
        }
    }
    drawHierarchy(parent) {
        if (parent instanceof Rect) {
            this.resize(parent);
            this.draw();
        }
    }
    resize(parent) {
        this.absEdges = parent.absEdges;
    }
    edgesToDrawdimensions(edges) {
        //convert absolute edges to position and size
        let res = { pos: { x: 0, y: 0 }, size: { w: 0, h: 0 } };
        res.pos.x = edges.left;
        res.pos.y = edges.top;
        res.size.w = edges.right - edges.left;
        res.size.h = edges.bottom - edges.top;
        return res;
    }
}
