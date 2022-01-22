import { Canvas } from "./canvas.js";
import { EObjectType, IShape } from "./shape.js";
import { Rect} from "./rect.js";
import { EConstraintsY } from "./types/constraints.js";
import { IEdges } from "./types/edges.js";


export class VerticalBox extends Rect{
    type: EObjectType=EObjectType.VtBox;
    constructor(parent:IShape,canvas:Canvas){
        super(parent,canvas);
    }
}