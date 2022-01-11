import { blockHandlers, blocks } from "../../block.js";
import { BoundingRect } from "../../ui/bounding_rect.js";
import { Button } from "../../ui/button.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { EMouseType } from "../../ui/types/mouse.js";
import { ContextMenu } from "../context_menu/context_menu.js";
export class View extends Button {
    constructor(parent, canvas, firstLoadBlock) {
        super(parent, canvas);
        this.children = [];
        this.actifContextMenu = null;
        this.color = "lightgrey";
        this.loadedBlock = firstLoadBlock;
        this.load(firstLoadBlock);
        this.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
        console.log(this);
    }
    save(saveToBlock) {
        saveToBlock.source = this.children.slice();
        BoundingRect.drawHierarchy();
        console.log("save");
    }
    load(loadFromBlock) {
        this.loadedBlock.isLoaded = false;
        loadFromBlock.isLoaded = true;
        this.loadedBlock = loadFromBlock;
        this.children = loadFromBlock.source;
        console.log("load");
        //console.log(blocks)
        //console.log(loadFromBlock)
        //console.log(blocks[0])
        for (const BlockHandler of blockHandlers) {
            BlockHandler.updateBlocks(blocks);
        }
        BoundingRect.drawHierarchy();
    }
    changeActiveBlock(loadFromBlock) {
        this.save(this.loadedBlock);
        this.load(loadFromBlock);
    }
    onMouseDown(type) {
    }
    onMouseMoveDown(type) {
    }
    onMouseUp(type) {
        this.actifContextMenu?.destroy();
        this.actifContextMenu = null;
        if (type == EMouseType.left || type == EMouseType.touch) {
            this.actifContextMenu = new ContextMenu(BoundingRect, this.canvas);
        }
        BoundingRect.drawHierarchy();
    }
}
