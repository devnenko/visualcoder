import { Button } from "../../../ui/button.js";
import { Canvas } from "../../../ui/canvas.js";
import {  instanceOfRectType, Rect, RectType } from "../../../ui/rect.js";
import {  Text } from "../../../ui/text.js";
import { VerticalBox } from "../../../ui/vertical_box.js";
import { ViewBlock, PinType } from "../view/view_block.js";
import { EConstraintsX,EConstraintsY } from '../../../ui/types/constraints.js';
import { BoundingRect} from "../../../ui/bounding_rect.js";
import { components } from "../../../main.js";
import { MouseHandler } from "../../../ui/event_handlers/mouse.js";
import { blocks, Block } from "../view/block.js";
import { IShape} from "../../../ui/shape.js";
import { EMouseType } from "../../../ui/types/mouse.js";
import { SideBar } from "./sidebar.js";
import { View } from "../view/view.js";

export class SideBarTab extends Button{
    public origColor:string;
    public block:Block;
    public parent:SideBar;
    public provBlock:ViewBlock|null=null;
    constructor(parent:SideBar,block:Block){
        super(parent,parent.canvas);
        this.parent=parent;
        this.setConstraints(EConstraintsX.scale,EConstraintsY.top)
        this.setConstraintsInfo(undefined,{w:0,h:50});
        if(block.isLoaded==false){
            this.color=block.color;
        }
        else{
            this.color="#262626";
        }
        this.origColor=block.color;
        this.block=block;
        const text=new Text(this,this.canvas)
        text.color="black"
        text.text=block.name;

        //const deleteButton =new DeleteButton(this,this.canvas,this.delete);
        //deleteButton.setConstraints(EConstraintsX.right,EConstraintsY.scale);
        //deleteButton.setConstraintsInfo({x:0,y:0},{w:50,h:50},{top:10,bottom:10,left:0,right:10})

        //parent.addTab.arraymove(parent.children,parent.children.indexOf(this),parent.children.indexOf(this)-1);
    }


    //destroy(parent:RectType){
    //    (parent as SideBarTab).parent.children.splice((parent as SideBarTab).parent.children.indexOf(parent),1);
    //    blocks.splice((parent as SideBarTab).parent.children.indexOf(parent),1);
    //    BoundingRect.drawHierarchy();
    //}

    onMouseDown(type:EMouseType){
    }

    onMouseMoveDown(type:EMouseType){
        if(components.view.checkOverlapp(MouseHandler.currentPos)?.indexOf(components.view)!=-1 && this.block.isLoaded==false){
            if(this.provBlock==null){
                this.provBlock=new ViewBlock(MouseHandler.posOnRects(components.view),this.block);
                this.provBlock.fixedPos.x=MouseHandler.posOnRects(components.view).x-this.provBlock.fixedSize.w/2;
                this.provBlock.fixedPos.y=MouseHandler.posOnRects(components.view).y-this.provBlock.fixedSize.h/2;
            }
            else{
                this.provBlock.fixedPos.x=MouseHandler.posOnRects(components.view).x-this.provBlock.fixedSize.w/2;
                this.provBlock.fixedPos.y=MouseHandler.posOnRects(components.view).y-this.provBlock.fixedSize.h/2;
            }
        }
        else{
            this.provBlock?.destroy();
            this.provBlock=null;
        }
        BoundingRect.drawHierarchy();
    }
    onMouseUp(type:EMouseType){

        if(components.view.checkOverlapp(MouseHandler.currentPos)?.indexOf(components.view)!=-1&& this.block.isLoaded==false&&this.provBlock!=null){
            const viewBlock=new ViewBlock(
                {x:MouseHandler.posOnRects(components.view).x-this.provBlock.fixedSize.w/2,y:MouseHandler.posOnRects(components.view).y-this.provBlock.fixedSize.h/2},this.block);
        }

        this.provBlock?.destroy();
        this.provBlock=null;

        if(BoundingRect.checkOverlapp(MouseHandler.currentPos)[0]==this){
            components.view.changeActiveBlock(this.block);
        }

        BoundingRect.drawHierarchy();
        //if(type==EMouseType.right&&this.block.isLoaded==false){
        //    this.provBlock=null;
        //    this.color=this.origColor;
        //    BoundingRect.drawHierarchy();
        //    if(components.view.checkOverlapp(MouseHandler.currentPos)?.indexOf(components.view)!=-1){
        //        const viewBlock=new ViewBlock(components.view,MouseHandler.posOnRects(components.view),this.block);
        //        viewBlock.color=this.block.color;
        //        for (const pin of this.block.pins){
        //            viewBlock.addPin(pin);
        //        }
        //        BoundingRect.drawHierarchy();
        //    }
        //}
    }

    onMouseHoverBegin(type: EMouseType): void {
        if(this.block.isLoaded==false){
            this.color="#4a4a4a"
        }
        BoundingRect.drawHierarchy();
    }

    onMouseHoverEnd(type: EMouseType): void {
        if(this.block.isLoaded==false){
            this.color=this.origColor;
        }
        BoundingRect.drawHierarchy();
    }
}