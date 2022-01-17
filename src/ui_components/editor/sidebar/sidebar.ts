import { Button } from "../../../ui/button.js";
import { Canvas } from "../../../ui/canvas.js";
import {  Rect, RectType } from "../../../ui/rect.js";
import {  Text } from "../../../ui/text.js";
import { VerticalBox } from "../../../ui/vertical_box.js";
import { ViewBlock, PinType } from "../view/view_block.js";
import { EConstraintsX,EConstraintsY } from '../../../ui/types/constraints.js';
import { BoundingRect} from "../../../ui/bounding_rect.js";
import { MouseHandler } from "../../../ui/event_handlers/mouse.js";
import { blockHandlers, Block, IBlockHandler } from "../view/block.js";
import { EMouseType } from "../../../ui/types/mouse.js";
import { SideBarTab } from "./sidebartab.js";
import { SideBarAddTab } from "./sidebaraddtab.js";
import { View } from "../view/view.js";
import { HorizontalBox } from "../../../ui/horizontal_box.js";




export class SideBar extends VerticalBox implements IBlockHandler{
    //public loadedTab:SideBarTab|null=null;
    //public addTab:SideBarAddTab;
    constructor(parent:RectType,canvas:Canvas){
        super(parent,canvas);
        blockHandlers.push(this);
        this.color="darkgrey";
        this.setConstraints(EConstraintsX.left,EConstraintsY.scale)
        this.setConstraintsInfo(undefined,{w:200,h:0});
        //this.addTab=new SideBarAddTab(this);
    }

    public updateBlocks(allBlocks:Block[]):void{
        //const rect=new HorizontalBox(this,this.canvas);
        //rect.color="blue"
        //rect.setConstraints(EConstraintsX.scale,EConstraintsY.top);
        //rect.fixedSize.h=80;
        //const compileRect=new Button(rect,this.canvas);
        //compileRect.setConstraints(EConstraintsX.left,EConstraintsY.scale);
        //compileRect.fixedSize.w=80;
        //compileRect.color="yellow"
        //compileRect.onMouseDown=(type:EMouseType)=>{
        //    compileRect.color="red"
        //    //run compilation check here 
        //    //actually, it might be better to check all stuff in real time
        //    BoundingRect.drawHierarchy();
        //}
        //compileRect.onMouseUp=(type:EMouseType)=>{
        //    compileRect.color="yellow"
        //    BoundingRect.drawHierarchy();
        //}
        this.children=[];
        for(const elem of allBlocks){
            if(elem.isMenuHidden==false){
                const tab=new SideBarTab(this,elem)
            }
        }
        
        BoundingRect.drawHierarchy();
    }

}