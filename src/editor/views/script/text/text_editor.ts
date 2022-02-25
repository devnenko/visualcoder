// @ts-nocheck

import { editor } from "../../../../main.js";
import { Canvas } from "../../../../ui/canvas.js";
import { colorCreator } from "../../../../ui/color.js";
import { KeypressHandler } from "../../../../ui/event_handlers/keypress.js";
import { IMouseHandler, MouseHandler } from "../../../../ui/event_handlers/mouse.js";
import { HorizontalBox } from "../../../../ui/horizontal_box.js";
import { Rect } from "../../../../ui/rect.js";
import { boundingShape, IShape, Shape } from "../../../../ui/shape.js";
import { Text } from "../../../../ui/text_box.js";
import { EConstraintsX, EConstraintsY } from "../../../../ui/types/constraints.js";
import { EMouseType } from "../../../../ui/types/mouse.js";
import { IPos } from "../../../../ui/types/pos.js";
import { VerticalBox } from "../../../../ui/vertical_box.js";
import { HoverPressButton } from "../button.js";
import { GeFile } from "../../ge_file.js";

export interface IKeyPressHandler{
    onKeyPress(key:string):void;
}

export class TextEditor extends VerticalBox implements IKeyPressHandler{
    text:Text;
    constructor(parent:IShape,canvas:Canvas,file:GeFile){
        super(parent,canvas,file)
        KeypressHandler.subscribe(this);
        this.isVisible=false;
        this.setConstraints(EConstraintsX.scale,EConstraintsY.scale);
        this.file=file;
        this.text=new Text(this,this.canvas)
        this.text.text=this.file.source;
    }
    onKeyPress(key:string): void {
        let newString="";
        if(key=="Backspace"){
            newString=this.text.text.slice(0, -1)
        }
        else{
            newString=this.text.text.concat(key);
        }
        console.log(key)
        this.text.text=newString;
        this.file.source=newString;

        boundingShape.drawHierarchy();
    }
}
