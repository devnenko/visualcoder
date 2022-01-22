import { BoundingRect } from "../../ui/bounding_shape.js";
import { Button } from "../../ui/button.js";
import { Canvas } from "../../ui/canvas.js";
import { IMouseEvents } from "../../ui/clickable.js";
import { RectType } from "../../ui/rect.js";
import { Text } from "../../ui/text.js";
import { EMouseType } from "../../ui/types/mouse.js";



export class HoverPressButton extends Button{
    public hoverColor:string;
    public pressColor:string;
    private origColor:string="";
    public text:Text;
    constructor(parent:RectType,canvas:Canvas){
        super(parent,canvas)
        this.hoverColor=this.color;
        this.pressColor=this.color;
        this.text=new Text(this,this.canvas);
        this.text.text="";

    }
    onMouseHoverBegin(type: EMouseType): void {
        this.origColor=this.color;
        this.color=this.hoverColor;
        BoundingRect.drawHierarchy();
    }
    onMouseHoverEnd(type: EMouseType): void {
        this.color=this.origColor;
        BoundingRect.drawHierarchy();
    }
    onMouseDown(type: EMouseType): void {
        this.color=this.pressColor;
        BoundingRect.drawHierarchy();
    }
    onMouseUp(type: EMouseType): void {
        this.color=this.origColor;
        BoundingRect.drawHierarchy();
    }
}