
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
import { Block, blocks, BlockType } from "../../block.js";
import { Line } from "../../ui/line.js";

export enum PinType{
    in=0,
    out=1
}

class Pin extends Button{

    public mouseEdge:Rect|null=null;

    public provLine:Line|null=null;

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
        this.provLine=new Line(BoundingRect,components.view.canvas)
        this.provLine.obj1=this;
        this.provLine.fixedPos2=MouseHandler.currentPos;
        BoundingRect.drawHierarchy()
    };
    onMouseMoveDown(type:EMouseType){
        if(this.provLine!=null){
            this.provLine.fixedPos2=MouseHandler.currentPos;
            BoundingRect.drawHierarchy()
            console.log("yes");
            console.log(this.provLine)
        }
    };
    onMouseUp(type:EMouseType){
        console.log(BoundingRect.checkOverlapp(MouseHandler.currentPos));
        if(BoundingRect.checkOverlapp(MouseHandler.currentPos)[0] instanceof Pin){
            if(this.provLine!=null){
                this.provLine.obj2=BoundingRect.checkOverlapp(MouseHandler.currentPos)[0];
                BoundingRect.drawHierarchy()
            }
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
    public block:BlockType;
    constructor(view:View,pos:IPos,block:BlockType){
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
        for (const pin of this.block.pins){
            this.addPin(pin);
        }
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