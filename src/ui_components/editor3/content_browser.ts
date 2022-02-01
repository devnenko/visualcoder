import { editor } from "../../main.js";
import { Button } from "../../ui/button.js";
import { Canvas } from "../../ui/canvas.js";
import { colorCreator } from "../../ui/color.js";
import { MouseHandler } from "../../ui/event_handlers/mouse.js";
import { Rect } from "../../ui/rect.js";
import { boundingShape, IShape } from "../../ui/shape.js";
import { Text } from "../../ui/text.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { EMouseType } from "../../ui/types/mouse.js";
import { IPos } from "../../ui/types/pos.js";
import { VerticalBox } from "../../ui/vertical_box.js";
import { View } from "./view.js";

export class ContentBrowser extends VerticalBox{
    constructor(parent:IShape,canvas:Canvas){
        super(parent,canvas)
        this.fixedSize.w=200;
        this.setConstraints(EConstraintsX.scale,EConstraintsY.scale);
        this.color=colorCreator.colorByBrightness(20);
        const b1=new CBButton(this,this.canvas)
        b1.title.text="file1"
        b1.fileType.text="img"
        b1.source="content1"
        const b2=new CBButton(this,this.canvas)
        b2.title.text="file2"
        b2.source="content2"
        const b3=new CBButton(this,this.canvas)
        b3.title.text="file3"
        b3.source="content3"
        const b4=new CBButton(this,this.canvas)
        b4.title.text="file4"
        b4.source="content4"
    }
}

export class CBButton extends Button{
    title:Text;
    fileType:Text;
    source:string="hello";
    previewRect:Rect|null=null;
    //type:Text;

    constructor(parent:ContentBrowser,canvas:Canvas){
        super(parent,canvas)
        this.fixedSize.h=60;
        this.setConstraints(EConstraintsX.scale,EConstraintsY.top);
        this.color=colorCreator.colorByBrightness(10);
        
        this.title=new Text(this,this.canvas);
        this.title.color="white";
        this.title.text="test.txt"

        this.fileType=new Text(this,this.canvas);
        this.fileType.fixedOffset.x=100;
        this.fileType.color="white";
        this.fileType.text="hi"
    }
    onMouseHoverBegin(type: EMouseType): void {
        this.color=colorCreator.colorByBrightness(25);
    }
    onMouseHoverEnd(type: EMouseType): void {
        this.color=colorCreator.colorByBrightness(10);
    }
    onMouseDown(type: EMouseType, pos: IPos): void {
        this.color=colorCreator.colorByBrightness(25);
    }
    onMouseMoveDown(type: EMouseType, pos: IPos): void {
        //editor.updateViewPreview(pos);
    }
    onMouseUp(type: EMouseType, pos: IPos): void {
        //editor.convertToView(pos,this);
        this.color=colorCreator.colorByBrightness(10);
        const overlapping=MouseHandler.getOverlapping(pos)[0];
        if(overlapping==this){
            console.log("yeye")
            //editor.selectedView.load(this);
        }
    }
}