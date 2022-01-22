import { Button } from "../../ui/button.js";
import { Canvas } from "../../ui/canvas.js";
import { colorCreator } from "../../ui/color.js";
import { Rect } from "../../ui/rect.js";
import { EObjectType, IShape } from "../../ui/shape.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { EMouseType } from "../../ui/types/mouse.js";
import { IPos } from "../../ui/types/pos.js";
import { VerticalBox } from "../../ui/vertical_box.js";


export class ResizeBar extends Button{
    p1;
    p2;
    minSize=40;
    constructor(drawParent:IShape,canvas:Canvas,p1:Rect,p2:Rect){
        super(drawParent,canvas)
        this.p1=p1;
        this.p2=p2;
        this.fixedSize.w=12;
        this.fixedSize.h=12;
        if(p1.parent instanceof Rect){
            if(p1.parent.type=EObjectType.HzBox){
                this.fixedPos.x=p1.fixedSize.w-this.fixedSize.w/2;
                this.setConstraints(EConstraintsX.left,EConstraintsY.scale);
            }
            else if(p1.parent.type=EObjectType.VtBox){
                this.fixedPos.y=p1.fixedSize.h-this.fixedSize.h/2;
                this.setConstraints(EConstraintsX.scale,EConstraintsY.top);
            }
        }
        this.color="blue";
        this.isVisible=false;
    }
    onMouseHoverBegin(type: EMouseType, pos: IPos): void {
        this.isVisible=true;
    }
    onMouseHoverEnd(type: EMouseType, pos: IPos): void {
        this.isVisible=false;
    }
    onMouseDown(type: EMouseType, pos: IPos): void {
        this.isVisible=true;
    }
    onMouseMoveDown(type: EMouseType,pos:IPos): void {
        if(this.p1.parent instanceof Rect){
            if(this.p1.parent.type=EObjectType.HzBox){
                if(pos.x-this.fixedSize.w/2>this.minSize&&pos.x+this.fixedSize.w/2<window.innerWidth){
                    this.fixedPos.x=pos.x-this.fixedSize.w/2;
                    this.p1.fixedSize.w=this.fixedPos.x+this.fixedSize.w/2;
                }
            }
            else if(this.p1.parent.type=EObjectType.VtBox){
                if(pos.y-this.fixedSize.h/2>this.minSize&&pos.y+this.fixedSize.h/2<window.innerHeight){
                    this.fixedPos.y=pos.y-this.fixedSize.h/2;
                    this.p1.fixedSize.h=this.fixedPos.y+this.fixedSize.w/2;
                }
            }
        }
    }
    onMouseUp(type: EMouseType, pos: IPos): void {
        this.isVisible=false;
    }
}