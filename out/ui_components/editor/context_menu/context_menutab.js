import { Button } from "../../../ui/button.js";
import { Text } from "../../../ui/text.js";
import { ViewBlock } from "../view/view_block.js";
import { EConstraintsX, EConstraintsY } from '../../../ui/types/constraints.js';
import { BoundingRect } from "../../../ui/bounding_rect.js";
import { components } from "../../../main.js";
import { MouseHandler } from "../../../ui/event_handlers/mouse.js";
export class ContextMenutab extends Button {
    constructor(parent, block) {
        super(parent, parent.canvas);
        this.parent = parent;
        this.setConstraints(EConstraintsX.scale, EConstraintsY.top);
        this.setConstraintsInfo(undefined, { w: 0, h: 50 });
        if (block.isLoaded == false) {
            this.color = block.color;
        }
        else {
            this.color = "#262626";
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
    onMouseDown(type) {
        const provBlock = new ViewBlock(MouseHandler.posOnRects(components.view), this.block);
        provBlock.fixedPos.x = MouseHandler.posOnRects(components.view).x - provBlock.fixedSize.w / 2;
        provBlock.fixedPos.y = MouseHandler.posOnRects(components.view).y - provBlock.fixedSize.h / 2;
        BoundingRect.drawHierarchy();
    }
    onMouseMoveDown(type) {
    }
    onMouseUp(type) {
    }
    onMouseHoverBegin(type) {
        if (this.block.isLoaded == false) {
            this.color = "#4a4a4a";
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
