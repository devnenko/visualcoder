
import { IMouseEvents } from "../../../ui/clickable.js";
import { BoundingRect } from "../../../ui/bounding_shape.js";
import { Button } from "../../../ui/button.js";
import { Canvas } from "../../../ui/canvas.js";
import { MouseHandler } from "../../../ui/event_handlers/mouse.js";
//import { Line } from "../ui/line.js";
import { Rect} from "../../../ui/rect.js";
import { EConstraintsX, EConstraintsY } from "../../../ui/types/constraints.js";
import { EMouseType } from "../../../ui/types/mouse.js";
import { IPos } from "../../../ui/types/pos.js";
import { View } from "./view.js";
import {  Text } from "../../../ui/text.js";
import { Block, blocks, BlockType, PrimitiveBlock} from "./block.js";
import { Line } from "../../../ui/line.js";
import { EditorPage } from "../editor_page.js";

export enum PinType{
    in=0,
    out=1
}

class Pin extends Button{

    public mouseEdge:Rect|null=null;

    public provLine:Line|null=null;

    public nextLine:Line|null=null;

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
        this.provLine=new Line(EditorPage.self.view,EditorPage.self.view.canvas)
        this.provLine.obj1=this;
        this.provLine.fixedPos2=MouseHandler.currentPos;
        BoundingRect.drawHierarchy()
    };
    onMouseMoveDown(type:EMouseType){
        if(this.provLine!=null){
            this.provLine.fixedPos2=MouseHandler.currentPos;
            BoundingRect.drawHierarchy()
        }
    };
    onMouseUp(type:EMouseType){
        this.provLine?.destroy();
        this.provLine=null;
        if(BoundingRect.checkOverlapp(MouseHandler.currentPos)[0] instanceof Pin){
            this.nextLine=new Line(EditorPage.self.view,EditorPage.self.view.canvas);
            this.nextLine.obj1=this;
            this.nextLine.obj2=BoundingRect.checkOverlapp(MouseHandler.currentPos)[0];
            //if(this.provLine!=null){
            //    this.provLine.obj2=BoundingRect.checkOverlapp(MouseHandler.currentPos)[0];
            //    BoundingRect.drawHierarchy()
            //}
        }
        else{
            //if(this.provLine!=null){
            //    const index = components.view.children.indexOf(this.provLine);
            //    components.view.children.splice(index, 1);
            //    BoundingRect.update();
        }
        BoundingRect.drawHierarchy();
    }

};

export class ViewBlock extends Button{
    public mouseOffset={leftDist:0,topDist:0};
    public pins:Pin[]=[];
    public amountInPins:number=0;
    public amountOutPins:number=0;
    public block:BlockType;
    constructor(pos:IPos,block:BlockType){
        super(EditorPage.self.view,EditorPage.self.view.canvas);
        this.block=block;
        this.color=block.color
        this.setConstraints(EConstraintsX.left,EConstraintsY.top);
        this.setConstraintsInfo(undefined,{w:200,h:140});
        this.fixedPos=pos;
        const text=new Text(this,this.canvas);
        text.color="black";
        text.text=block.name;
        this.children.push(text)
        if(this.block instanceof PrimitiveBlock){
            for (const pin of this.block.pins){
                this.addPin(pin)
            }
        }
        else if(this.block instanceof Block){
            for (const pin of this.block.outBlock.pins){
                this.addPin(pin)
            }
            for (const pin of this.block.inBlock.pins){
                this.addPin(pin)
            }
        }
    }


    onMouseDown(type:EMouseType){
        this.mouseOffset={leftDist:MouseHandler.getMousePos().x-this.absEdges.left,topDist:MouseHandler.getMousePos().y-this.absEdges.top}
    };
    onMouseMoveDown(type:EMouseType){
        this.fixedPos.x=MouseHandler.getRelativeMousePos(EditorPage.self.view).x-this.mouseOffset.leftDist;
        this.fixedPos.y=MouseHandler.getRelativeMousePos(EditorPage.self.view).y-this.mouseOffset.topDist;
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