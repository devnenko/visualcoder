import { Canvas } from "./canvas.js";
import {  EObjectType, IShape} from "./shape.js";
import { Rect} from "./rect.js";
import { EConstraintsX } from "./types/constraints.js";
import { IEdges } from "./types/edges.js";


export class HorizontalBox extends Rect{
    type: EObjectType=EObjectType.HzBox;
    constructor(parent:IShape,canvas:Canvas){
        super(parent,canvas);
    }
}