import { Button } from "../../ui/button.js";
import { Text } from "../../ui/text.js";
import { ViewBlock } from "../view/view_block.js";
import { EConstraintsX, EConstraintsY } from '../../ui/types/constraints.js';
import { BoundingRect } from "../../ui/bounding_rect.js";
import { components } from "../../main.js";
import { MouseHandler } from "../../ui/event_handlers/mouse.js";
import { blocks } from "../../block.js";
export class SideBarTab extends Button {
    constructor(parent, block) {
        super(parent, parent.canvas);
        this.provBlock = null;
        this.parent = parent;
        this.setConstraints(EConstraintsX.scale, EConstraintsY.top);
        this.setConstraintsInfo(undefined, { w: 0, h: 50 });
        if (block.isLoaded == false) {
            this.color = block.color;
        }
        else {
            this.color = "red";
        }
        this.origColor = block.color;
        this.block = block;
        const text = new Text(this, this.canvas);
        text.color = "black";
        text.text = block.name;
        //const deleteButton =new DeleteButton(this,this.canvas,this.delete);
        //deleteButton.setConstraints(EConstraintsX.right,EConstraintsY.scale);
        //deleteButton.setConstraintsInfo({x:0,y:0},{w:50,h:50},{top:10,bottom:10,left:0,right:10})
        //parent.addTab.arraymove(parent.children,parent.children.indexOf(this),parent.children.indexOf(this)-1);
    }
    destroy(parent) {
        parent.parent.children.splice(parent.parent.children.indexOf(parent), 1);
        blocks.splice(parent.parent.children.indexOf(parent), 1);
        BoundingRect.drawHierarchy();
    }
    onMouseDown(type) {
    }
    onMouseMoveDown(type) {
        if (components.view.checkOverlapp(MouseHandler.currentPos)?.indexOf(components.view) != -1 && this.block.isLoaded == false) {
            if (this.provBlock == null) {
                this.provBlock = new ViewBlock(components.view, MouseHandler.posOnRects(components.view), this.block);
            }
            else {
                this.provBlock.fixedPos = MouseHandler.posOnRects(components.view);
            }
            BoundingRect.drawHierarchy();
        }
    }
    onMouseUp(type) {
        console.log(this.provBlock);
        this.provBlock?.destroy;
        this.provBlock = null;
        if (BoundingRect.checkOverlapp(MouseHandler.currentPos)[0] == this) {
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
    onMouseHoverBegin(type) {
        if (this.block.isLoaded == false) {
            this.color = "pink";
        }
        BoundingRect.drawHierarchy();
    }
    onMouseHoverEnd(type) {
        if (this.block.isLoaded == false) {
            this.color = this.origColor;
        }
        BoundingRect.drawHierarchy();
    }
}
