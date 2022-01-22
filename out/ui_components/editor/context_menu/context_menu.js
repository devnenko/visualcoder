import "../../../ui/ui.js";
import { VerticalBox } from "../../../ui/vertical_box.js";
import { EConstraintsX, EConstraintsY } from '../../../ui/types/constraints.js';
import { BoundingRect } from "../../../ui/bounding_shape.js";
import { MouseHandler } from "../../../ui/event_handlers/mouse.js";
import { blockHandlers, blocks } from "../view/block.js";
import { ContextMenutab } from "./context_menutab.js";
export class ContextMenu extends VerticalBox {
    //public loadedTab:SideBarTab|null=null;
    //public addTab:SideBarAddTab;
    constructor(parent, canvas) {
        super(parent, canvas);
        blockHandlers.push(this);
        this.color = "darkgrey"; //darkergray "#262626"
        this.setConstraints(EConstraintsX.left, EConstraintsY.top);
        this.setConstraintsInfo(undefined, { w: 200, h: 250 });
        this.fixedPos = MouseHandler.currentPos;
        this.updateBlocks(blocks);
        //this.addTab=new SideBarAddTab(this);
    }
    updateBlocks(allBlocks) {
        this.children = [];
        for (const block of allBlocks) {
            if (block.isLoaded == false && block.isMenuHidden == false) {
                const tab = new ContextMenutab(this, block);
            }
        }
        BoundingRect.drawHierarchy();
    }
}
