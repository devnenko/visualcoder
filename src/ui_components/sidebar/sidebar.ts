import { Button } from "../../ui/button.js";
import { Canvas } from "../../ui/canvas.js";
import {  Rect, RectType } from "../../ui/rect.js";
import {  Text } from "../../ui/text.js";
import { VerticalBox } from "../../ui/vertical_box.js";
import { ViewBlock, PinType } from "../view/view_block.js";
import { EConstraintsX,EConstraintsY } from '../../ui/types/constraints.js';
import { BoundingRect} from "../../ui/bounding_rect.js";
import { components } from "../../main.js";
import { MouseHandler } from "../../ui/event_handlers/mouse.js";
import { blockHandlers, Block, IBlockHandler } from "../../block.js";
import { EMouseType } from "../../ui/types/mouse.js";
import { DeleteButton } from "../general/delete_button.js";
import { SideBarTab } from "./sidebartab.js";
import { SideBarAddTab } from "./sidebaraddtab.js";
import { View } from "../view/view.js";




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
        this.children=[];
        for(const elem of allBlocks){
            if(elem.isHidden==false){
                const tab=new SideBarTab(this,elem)
            }
        }
        
        BoundingRect.drawHierarchy();
    }

}