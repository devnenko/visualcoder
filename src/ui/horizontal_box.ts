import { Canvas } from "./canvas.js";
import {  EObjectType} from "./shape.js";
import { Rect, RectType } from "./rect.js";
import { EConstraintsX } from "./types/constraints.js";
import { IEdges } from "./types/edges.js";


export class HorizontalBox extends Rect{
    type: EObjectType=EObjectType.HzBox;
    constructor(parent:RectType,canvas:Canvas){
        super(parent,canvas);
    }
}