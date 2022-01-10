import { Canvas } from "./canvas.js";
import { EObjectType } from "./shape.js";
import { Rect, RectType } from "./rect.js";
import { EConstraintsY } from "./types/constraints.js";
import { IEdges } from "./types/edges.js";


export class VerticalBox extends Rect{
    type: EObjectType=EObjectType.VtBox;
    constructor(parent:RectType,canvas:Canvas){
        super(parent,canvas);
    }
}