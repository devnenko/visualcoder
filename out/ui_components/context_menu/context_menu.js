import { VerticalBox } from "../../ui/vertical_box.js";
import { EConstraintsX, EConstraintsY } from '../../ui/types/constraints.js';
import { BoundingRect } from "../../ui/bounding_rect.js";
import { MouseHandler } from "../../ui/event_handlers/mouse.js";
import { blockHandlers, blocks } from "../../block.js";
import { ContextMenutab } from "./context_menutab.js";
export class ContextMenu extends VerticalBox {
    //public loadedTab:SideBarTab|null=null;
    //public addTab:SideBarAddTab;
    constructor(parent, canvas) {
        super(parent, canvas);
        blockHandlers.push(this);
        this.color = "#4a4a4a"; //darkergray "#262626"
        this.setConstraints(EConstraintsX.left, EConstraintsY.top);
        this.setConstraintsInfo(undefined, { w: 200, h: 250 });
        this.fixedPos = MouseHandler.currentPos;
        this.updateBlocks(blocks);
        //this.addTab=new SideBarAddTab(this);
    }
    updateBlocks(allBlocks) {
        this.children = [];
        for (const elem of allBlocks) {
            if (elem.isLoaded == false) {
                const tab = new ContextMenutab(this, elem);
            }
        }
        BoundingRect.drawHierarchy();
    }
}
