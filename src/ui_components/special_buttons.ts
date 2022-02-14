import { editor } from "../main.js";
import { Canvas } from "../ui/canvas.js";
import { colorCreator } from "../ui/color.js";
import { IMouseHandler, MouseHandler } from "../ui/event_handlers/mouse.js";
import { HorizontalBox } from "../ui/horizontal_box.js";
import { Rect } from "../ui/rect.js";
import { boundingShape, IShape } from "../ui/shape.js";
import { Text } from "../ui/text.js";
import { EConstraintsX, EConstraintsY } from "../ui/types/constraints.js";
import { EMouseType } from "../ui/types/mouse.js";
import { IPos } from "../ui/types/pos.js";
import { VerticalBox } from "../ui/vertical_box.js";
import { Scene } from "./views/scene.js";
import { allFiles, ContentBrowser } from "./views/content_browser.js";
import { View } from "./views/view.js";



export class HoverPressButton extends Rect implements IMouseHandler{
    public hoverColor:string;
    public pressColor:string;
    private origColor:string="";
    public text:Text;
    public onCLick:()=>void=()=>{};
    constructor(parent:IShape,canvas:Canvas){
        super(parent,canvas)
        MouseHandler.subscribe(this);
        this.hoverColor=this.color;
        this.pressColor=this.color;
        this.text=new Text(this,this.canvas);
        this.text.text="";

    }
    setOrigColor(origColor:string){
        this.color=origColor;
        this.origColor=this.color
    }
    onMouseHoverBegin(type: EMouseType,pos:IPos): void {
        this.origColor=this.color;
        this.color=this.hoverColor;
    }
    onMouseHoverEnd(type: EMouseType,pos:IPos): void {
        this.color=this.origColor;
    }
    onMouseDown(type: EMouseType,pos:IPos): void {
        this.color=this.pressColor;
    }
    onMouseUp(type: EMouseType,pos:IPos): void {
        this.color=this.origColor;
        this.onCLick();
    }
}

export class ToggleButton extends Rect implements IMouseHandler{
    public hoverColor:string;
    public pressColor:string;
    private origColor:string="";
    public text:Text;
    public isOn:boolean=false;
    public onToggle:()=>void=()=>{};
    constructor(parent:IShape,canvas:Canvas){
        super(parent,canvas)
        MouseHandler.subscribe(this);
        this.hoverColor=this.color;
        this.pressColor=this.color;
        this.text=new Text(this,this.canvas);
        this.text.text="";

    }
    setOrigColor(origColor:string){
        this.color=origColor;
        this.origColor=this.color
    }
    onMouseHoverBegin(type: EMouseType): void {
        if(this.isOn==false){
            this.color=this.hoverColor;
        }
    }
    onMouseHoverEnd(type: EMouseType): void {
        if(this.isOn==false){
            this.color=this.origColor;
        }
    }
    toggle(value:boolean){
        if(value==true){
            this.color=this.pressColor;
        }
        else{
            this.color=this.origColor;
        }
        this.isOn= value;
        this.onToggle();
    }
    onMouseDown(type: EMouseType): void {
        if(this.isOn==false){
            this.color=this.pressColor;
        }
        else{
            this.color=this.origColor;
        }
        this.isOn= !this.isOn;
        this.onToggle();
    }
}