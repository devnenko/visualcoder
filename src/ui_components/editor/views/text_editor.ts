import { editor } from "../../../main.js";
import { Button } from "../../../ui/button.js";
import { Canvas } from "../../../ui/canvas.js";
import { colorCreator } from "../../../ui/color.js";
import { KeypressHandler } from "../../../ui/event_handlers/keypress.js";
import { MouseHandler } from "../../../ui/event_handlers/mouse.js";
import { Rect } from "../../../ui/rect.js";
import { boundingShape, IShape } from "../../../ui/shape.js";
import { Text } from "../../../ui/text.js";
import { EConstraintsX, EConstraintsY } from "../../../ui/types/constraints.js";
import { EMouseType } from "../../../ui/types/mouse.js";
import { IPos } from "../../../ui/types/pos.js";
import { VerticalBox } from "../../../ui/vertical_box.js";
import { allFiles, File } from "./content_browser.js";
import { View } from "./view.js";

export interface IKeyPressHandler{
    onKeyPress(key:string):void;
}

export class TextEditor extends VerticalBox implements IKeyPressHandler{
    text;
    file;
    constructor(parent:IShape,canvas:Canvas,file:File){
        super(parent,canvas)
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
