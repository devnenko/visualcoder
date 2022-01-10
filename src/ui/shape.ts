import { IMouseEvents } from "./mouse_events.js";
import { Button } from "./button.js";
import { Canvas } from "./canvas.js";
import { HorizontalBox } from "./horizontal_box.js";
import { Rect } from "./rect.js";
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
    drawHierarchy:(parent:IShape)=>void, //draws shape and all children 
    checkOverlapp(pos:IPos): Button[]
}

export function instanceOfShape(object: any): object is IShape {
    return object.discriminator1 === 'IShape';
}