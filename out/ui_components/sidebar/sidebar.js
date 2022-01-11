import { VerticalBox } from "../../ui/vertical_box.js";
import { EConstraintsX, EConstraintsY } from '../../ui/types/constraints.js';
import { BoundingRect } from "../../ui/bounding_rect.js";
import { blockHandlers } from "../../block.js";
import { SideBarTab } from "./sidebartab.js";
export class SideBar extends VerticalBox {
    //public loadedTab:SideBarTab|null=null;
    //public addTab:SideBarAddTab;
    constructor(parent, canvas) {
        super(parent, canvas);
        blockHandlers.push(this);
        this.color = "darkgrey";
        this.setConstraints(EConstraintsX.left, EConstraintsY.scale);
        this.setConstraintsInfo(undefined, { w: 200, h: 0 });
        //this.addTab=new SideBarAddTab(this);
    }
    updateBlocks(allBlocks) {
        this.children = [];
        for (const elem of allBlocks) {
            if (elem.isHidden == false) {
                const tab = new SideBarTab(this, elem);
            }
        }
        BoundingRect.drawHierarchy();
    }
}
