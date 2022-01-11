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
import { blockHandlers, Block, IBlockHandler, blocks } from "../../block.js";
import { EMouseType } from "../../ui/types/mouse.js";
import { DeleteButton } from "../general/delete_button.js";
import { View } from "../view/view.js";
import { ContextMenutab } from "./context_menutab.js";




export class ContextMenu extends VerticalBox implements IBlockHandler{
    //public loadedTab:SideBarTab|null=null;
    //public addTab:SideBarAddTab;
    constructor(parent:RectType,canvas:Canvas){
        super(parent,canvas);
        blockHandlers.push(this);
        this.color="#4a4a4a";//darkergray "#262626"
        this.setConstraints(EConstraintsX.left,EConstraintsY.top)
        this.setConstraintsInfo(undefined,{w:200,h:250});
        this.fixedPos=MouseHandler.currentPos;
        this.updateBlocks(blocks);
        //this.addTab=new SideBarAddTab(this);
    }

    public updateBlocks(allBlocks:Block[]):void{
        this.children=[];
        for(const elem of allBlocks){
            if(elem.isLoaded==false){
                const tab=new ContextMenutab(this,elem)
            }
        }
        
        BoundingRect.drawHierarchy();
    }

}