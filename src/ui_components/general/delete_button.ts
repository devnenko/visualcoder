import { Button } from "../../ui/button.js";
import { Canvas } from "../../ui/canvas.js";
import {  Rect, RectType } from "../../ui/rect.js";
import {  Text } from "../../ui/text.js";
import { VerticalBox } from "../../ui/vertical_box.js";
import { ViewBlock, PinType } from "../view/view_block.js";
import { EConstraintsX,EConstraintsY } from '../../ui/types/constraints.js';
import { BoundingRect} from "../../ui/bounding_rect.js";
import { components } from "../../main.js";
import { MouseHandler } from "../../ui/event_handlers/mouse.js";
import { Block } from "../../block.js";
import { IShape} from "../../ui/shape.js";
import { EMouseType } from "../../ui/types/mouse.js";

export class DeleteButton extends Button{
    deleteFunction:(parent:RectType)=>void;
    ctx:RectType;
    constructor(parent:RectType,canvas:Canvas,deleteFunction:(ctx:RectType)=>void){
        super(parent,canvas);
        this.ctx=parent;
        this.deleteFunction=deleteFunction;
        this.setConstraints(EConstraintsX.scale,EConstraintsY.scale)
        this.setConstraintsInfo(undefined,{w:50,h:50});
        this.color="darkgrey"


    }
    onMouseDown(type:EMouseType){
        this.deleteFunction(this.ctx);
    }
    onMouseMoveDown(type:EMouseType){
    }
    onMouseUp(type:EMouseType){
    }
}