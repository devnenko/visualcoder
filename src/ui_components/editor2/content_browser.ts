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
        this.setConstraints(EConstraintsX.left,EConstraintsY.scale);
        this.color=colorCreator.colorByBrightness(20);
        const b1=new CBButton(this,this.canvas)
        b1.title.text="test1.txt"
        b1.source="this is it"
        new CBButton(this,this.canvas)
    }
}

export class CBButton extends Button{
    title;
    source:string="hello";
    previewRect:Rect|null=null;
    constructor(parent:ContentBrowser,canvas:Canvas){
        super(parent,canvas)
        this.fixedSize.h=60;
        this.setConstraints(EConstraintsX.scale,EConstraintsY.top);
        this.color=colorCreator.colorByBrightness(10);
        
        this.title=new Text(this,this.canvas);
        this.title.color="white";
        this.title.text="test.txt"
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
        const overlapping=MouseHandler.getOverlapping(pos)[0];
        if(overlapping instanceof View){
            if(this.previewRect==null){
                this.previewRect=new Rect(boundingShape,this.canvas);
                this.previewRect.color="rgba(0,0,255,0.2)"
            }
            else{
                this.previewRect.fixedPos={x:overlapping.absEdges.left,y:overlapping.absEdges.top};
                this.previewRect.fixedSize={w:overlapping.absEdges.right-overlapping.absEdges.left,h:overlapping.absEdges.bottom-overlapping.absEdges.top}
            }
        }
        else{
            if(this.previewRect!=null){
                this.previewRect.destroy();
                this.previewRect=null;
            }
        }
    }
    onMouseUp(type: EMouseType, pos: IPos): void {
        this.color=colorCreator.colorByBrightness(10);
        const overlapping=MouseHandler.getOverlapping(pos)[0];
        if(overlapping instanceof View){
            overlapping.load(this);
            if(this.previewRect!=null){
                this.previewRect.destroy();
                this.previewRect=null;
            }
        }
    }
}