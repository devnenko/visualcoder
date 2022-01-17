//import { components } from "../main.js";
import { IMouseEvents, instanceOfIMouseEvents } from "./mouse_events.js";
import { Button } from "./button.js";
import { Canvas } from "./canvas.js";
import {  IShape, EObjectType } from "./shape.js";
import { Rect } from "./rect.js";
import { IEdges } from "./types/edges.js";
import { IPos } from "./types/pos.js";

//this rect encapsulates all other rects
//it can refresh the whole screen when updated


//the any type addition disables typechecking for some reason
//this might introduce some bugs later


interface IBoundingRect{
    drawHierarchy:()=>void,
    checkOverlapp:(pos:IPos)=>Button[],
    type:EObjectType,
    absEdges:{left:number,top:number,right:number,bottom:number}
}

export const BoundingRect:IShape&IBoundingRect={
    discriminator1: 'IShape',
    type:EObjectType.Normal,
    children:[],
    absEdges:{left:0,top:0,right:window.innerWidth,bottom:window.innerHeight},



    drawHierarchy(){
        this.absEdges={left:0,right:window.innerWidth,top:0,bottom:window.innerHeight};
        this.canvas?.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (const child of this.children){
            child.drawHierarchy(this);
        }
    },

    checkOverlapp(pos:IPos){
        let all:Button[]=[];
        for (const child of this.children){
            all=all.concat((child as IShape).checkOverlapp(pos))
        }
        all=all.slice().reverse();
        return all;
    },

    destroy(){

    }
} 