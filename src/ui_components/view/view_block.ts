
import { components } from "../../main.js";
import { IMouseEvents } from "../../ui/mouse_events.js";
import { BoundingRect } from "../../ui/bounding_rect.js";
import { Button } from "../../ui/button.js";
import { Canvas } from "../../ui/canvas.js";
import { MouseHandler } from "../../ui/event_handlers/mouse.js";
//import { Line } from "../ui/line.js";
import { Rect} from "../../ui/rect.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { EMouseType } from "../../ui/types/mouse.js";
import { IPos } from "../../ui/types/pos.js";
import { View } from "./view.js";
import {  Text } from "../../ui/text.js";
import { Block, blocks } from "../../block.js";

export enum PinType{
    in=0,
    out=1
}

class Pin extends Button{

    public mouseEdge:Rect|null=null;

    //public provLine:Line|null=null;

    constructor(block:ViewBlock,pinType:PinType,amountPins:number){
        super(block,block.canvas);
        this.color="red"
        if(pinType==PinType.in){
            this.setConstraints(EConstraintsX.left,EConstraintsY.top)
            this.snapOffset.left=10;
        }
        else{
            this.setConstraints(EConstraintsX.right,EConstraintsY.top)
            this.snapOffset.right=10;
        }
        this.snapOffset.top=10+amountPins*30;
        this.fixedSize.w=20;
        this.fixedSize.h=20;
    }
    
    onMouseDown(type:EMouseType){
        this.mouseEdge=new Rect(BoundingRect,components.view.canvas);
        this.mouseEdge.isVisible=false;
        this.mouseEdge.fixedSize={w:0,h:0};
        this.mouseEdge.fixedPos=MouseHandler.currentPos;
        //this.provLine=new Line(components.view,components.view.canvas,this,this.mouseEdge)
        BoundingRect.drawHierarchy()
    };
    onMouseMoveDown(type:EMouseType){
        if(this.mouseEdge!=null){
            this.mouseEdge.fixedPos=MouseHandler.currentPos;
            BoundingRect.drawHierarchy()
        }
    };
    onMouseUp(type:EMouseType){
        console.log(BoundingRect.checkOverlapp(MouseHandler.currentPos));
        if(BoundingRect.checkOverlapp(MouseHandler.currentPos)[0] instanceof Pin){
            //if(this.provLine!=null){
            //    this.provLine.endParent=BoundingRect.checkOverlapp(MouseHandler.currentPos)[0];
            //}
        }
        else{
            //if(this.provLine!=null){
            //    const index = components.view.children.indexOf(this.provLine);
            //    components.view.children.splice(index, 1);
            //    BoundingRect.update();
            }
        }

};

export class ViewBlock extends Button{
    public mouseOffset={leftDist:0,topDist:0};
    public pins:Pin[]=[];
    public amountInPins:number=0;
    public amountOutPins:number=0;
    public block:Block;
    constructor(view:View,pos:IPos,block:Block){
        super(view,view.canvas);
        this.block=block;
        this.color=block.color
        this.setConstraints(EConstraintsX.left,EConstraintsY.top);
        this.setConstraintsInfo(undefined,{w:200,h:140});
        this.fixedPos=pos;
        const text=new Text(this,this.canvas);
        text.color="black";
        text.text=block.name;
        this.children.push(text)
    }


    onMouseDown(type:EMouseType){
        this.mouseOffset={leftDist:MouseHandler.getMousePos().x-this.absEdges.left,topDist:MouseHandler.getMousePos().y-this.absEdges.top}
    };
    onMouseMoveDown(type:EMouseType){
        this.fixedPos.x=MouseHandler.getRelativeMousePos(components.view).x-this.mouseOffset.leftDist;
        this.fixedPos.y=MouseHandler.getRelativeMousePos(components.view).y-this.mouseOffset.topDist;
        BoundingRect.drawHierarchy();
    };
    onMouseUp(type:EMouseType){

    };
    addPin(pinType:PinType){
        if(pinType==PinType.in){
            this.pins.push(new Pin(this,pinType,this.amountInPins));
            this.amountInPins++;
        }
        else{
            this.pins.push(new Pin(this,pinType,this.amountOutPins));
            this.amountOutPins++;
        }
    }
}