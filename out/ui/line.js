"use strict";
//import { Canvas } from "./canvas.js";
//import { Rect } from "./rect.js";
//import { IObject, IRect} from "./object.js";
//import { IEdges } from "./types/edges.js";
//import { IPos } from "./types/pos.js";
//
//class Line implements IObject{
//    public canvas:Canvas;
//    public children:IObject[]=[];
//    public parent:IRect;
//
//    public startParent:IRect;
//    public endParent:IRect;
//
//    public linewidth:number=6;
//
//    constructor(parent:Rect,canvas:Canvas,startParent:IRect,endParent:IRect){
//        this.parent=parent;
//        this.canvas=canvas
//        this.startParent=startParent;
//        parent.children.push(this); //set this as a child of parent to create an object tree
//        this.endParent=endParent;
//    }
//    public resize(parentSize:IEdges){
//    }
//    public draw(){
//        var ctx = this.canvas.ctx;
//        ctx.beginPath();
//        ctx.lineWidth = this.linewidth;
//        ctx.moveTo((this.startParent.absEdges.right-this.startParent.absEdges.left)/2+this.startParent.absEdges.left,
//            (this.startParent.absEdges.bottom-this.startParent.absEdges.top)/2+this.startParent.absEdges.top);
//        ctx.lineTo((this.endParent.absEdges.right-this.endParent.absEdges.left)/2+this.endParent.absEdges.left,
//        (this.endParent.absEdges.bottom-this.endParent.absEdges.top)/2+this.endParent.absEdges.top);
//        ctx.stroke();
//        
//    }
//    public drawInHierarchy(){
//        this.draw();
//    }
//    public erase(){
//
//    }
//    public checkOverlapp(pos:IPos){
//        return [];
//    }
//}
