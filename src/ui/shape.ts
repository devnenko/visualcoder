

import { Canvas } from "./canvas.js";
import { KeypressHandler } from "./event_handlers/keypress.js";
import { MouseHandler } from "./event_handlers/mouse.js";
import { HorizontalBox } from "./horizontal_box.js";
import { Rect} from "./rect.js";
import { IEdges } from "./types/edges.js";
import { IPos } from "./types/pos.js";
import { ITransform } from "./types/transform.js";

export enum EObjectType{
    Normal=0,
    HzBox=1,
    VtBox=2
}


export interface IShape{
    discriminator1: 'IShape',
    canvas?:Canvas,
    parent?:IShape;
    children:IShape[],//only children is passed (no parent)
    drawHierarchy:(parent:IShape)=>void, //draws shape and all children 
    //overlappHierarchy(pos:IPos): Button[]
    destroyHierarchy:()=>void
}

export function instanceOfShape(arg: any): arg is IShape {
    return arg.discriminator1 === 'IShape';
}

export class Shape implements IShape{
    public discriminator1: 'IShape'='IShape';
    public canvas:Canvas;
    public parent:IShape;
    public children:IShape[]=[];
    constructor(parent:IShape,canvas:Canvas){
        parent.children.push(this); //set this as a child of parent to create an object tree
        this.parent=parent;
        this.canvas=canvas;
    }

    public drawHierarchy(parent:IShape){
        for (const child of this.children){
            child.drawHierarchy(parent);
        }
    }

    //public overlappHierarchy(pos:IPos): Button[] {
    //    let all:Button[]=[];
    //    for (const child of this.children){
    //        all=all.concat((child as IShape).overlappHierarchy(pos) as Button[])
    //    }
    //    return all;
    //}

    public destroyHierarchy(){
        //this.parent.children.splice(this.parent.children.indexOf(this),1);
        //console.log("dest")

        const len=this.children.length

        for(let i=0;i<len;i++){
            this.children[0].destroyHierarchy();
        }
        this.parent.children.splice(this.parent.children.indexOf(this),1);
        //this.parent.children.splice(this.parent.children.indexOf(this),1);
    }
}

class BoundingShape implements IShape{
    public discriminator1: 'IShape'='IShape';
    public children:IShape[]=[];
    public absEdges={left:0,right:0,top:0,bottom:0};
    public type:EObjectType=EObjectType.Normal;
    constructor(){
    }

    public drawHierarchy(){
        this.absEdges={left:0,right:window.innerWidth,top:0,bottom:window.innerHeight}
        for (const child of this.children){
            child.drawHierarchy(this);
        }
    }

    //public overlappHierarchy(pos:IPos): Button[] {
    //    let all:Button[]=[];
    //    for (const child of this.children){
    //        all=all.concat((child as IShape).overlappHierarchy(pos) as Button[])
    //    }
    //    all=all.slice().reverse();
    //    return all;
    //}

    public destroyHierarchy(){
        for (const child of this.children){
            child.destroyHierarchy();
        }
    }
}

const boundingShape=new BoundingShape();
//Object.freeze(boundingShape);

export {boundingShape};