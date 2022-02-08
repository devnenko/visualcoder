import { editor } from "../../../main.js";
import { Button } from "../../../ui/button.js";
import { Canvas } from "../../../ui/canvas.js";
import { colorCreator } from "../../../ui/color.js";
import { MouseHandler } from "../../../ui/event_handlers/mouse.js";
import { Rect } from "../../../ui/rect.js";
import { boundingShape, IShape } from "../../../ui/shape.js";
import { Text } from "../../../ui/text.js";
import { EConstraintsX, EConstraintsY } from "../../../ui/types/constraints.js";
import { EMouseType } from "../../../ui/types/mouse.js";
import { IPos } from "../../../ui/types/pos.js";
import { VerticalBox } from "../../../ui/vertical_box.js";
import { allFiles } from "./content_browser.js";
import { View } from "./view.js";

export class Scene extends VerticalBox{
    res;
    constructor(parent:IShape,canvas:Canvas){
        super(parent,canvas)
        this.isVisible=false;
        this.setConstraints(EConstraintsX.scale,EConstraintsY.scale);

        this.res=new Text(this,this.canvas);
        this.res.color="red";
        this.res.text="no input";
    }
    refresh(){

    }
    reload(){
        for(const file of allFiles){
            if(file.type=="src"){
                console.log(file.source);
                this.res.text=file.source;
            }
        }
        boundingShape.drawHierarchy();
    }
}
