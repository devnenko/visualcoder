
import { Button } from "../../ui/button.js";
import { Canvas } from "../../ui/canvas.js";
import { IShape } from "../../ui/shape.js";

import { Text } from "../../ui/text.js";
import { EMouseType } from "../../ui/types/mouse.js";
import { IPos } from "../../ui/types/pos.js";



export class HoverPressButton extends Button{
    public hoverColor:string;
    public pressColor:string;
    private origColor:string="";
    public text:Text;
    constructor(parent:IShape,canvas:Canvas){
        super(parent,canvas)
        this.hoverColor=this.color;
        this.pressColor=this.color;
        this.text=new Text(this,this.canvas);
        this.text.text="";

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
    }
}

export class ToggleButton extends Button{
    public hoverColor:string;
    public pressColor:string;
    private origColor:string="";
    public text:Text;
    public isOn:boolean=false;
    public onToggle:()=>void=()=>{};
    constructor(parent:IShape,canvas:Canvas){
        super(parent,canvas)
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