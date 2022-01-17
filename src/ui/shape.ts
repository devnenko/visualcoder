import { IMouseEvents } from "./mouse_events.js";
import { Button } from "./button.js";
import { Canvas } from "./canvas.js";
import { HorizontalBox } from "./horizontal_box.js";
import { Rect, RectType } from "./rect.js";
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
    children:IShape[],//only children is passed (no parent)
    parent?:IShape;
    drawHierarchy:(parent:IShape)=>void, //draws shape and all children 
    checkOverlapp(pos:IPos): Button[]
    destroy:()=>void
}

export class Shape implements IShape{
    discriminator1: 'IShape'='IShape';
    canvas:Canvas;
    public children:IShape[]=[];
    public parent:IShape;
    constructor(parent:RectType,canvas:Canvas){
        parent.children.push(this); //set this as a child of parent to create an object tree
        this.parent=parent;
        this.canvas=canvas;
    }
    destroy(){
        console.log("dest")
        this.parent.children.splice(this.parent.children.indexOf(this),1);
        if(this.parent.children.indexOf(this)==-1){
            //console.log("error")
        }
    }

    public drawHierarchy(parent:IShape){
        for (const child of this.children){
            child.drawHierarchy(this);
        }
    }

    checkOverlapp(pos:IPos): Button[] {
        let all:Button[]=[];
        

        for (const child of this.children){
            all=all.concat((child as IShape).checkOverlapp(pos) as Button[])
        }
        return all;
    }
}

export function instanceOfShape(object: any): object is IShape {
    return object.discriminator1 === 'IShape';
}