import { BoundingRect } from "../ui/bounding_rect.js";
import { Button } from "../ui/button.js";
import { EConstraintsX, EConstraintsY } from "../ui/types/constraints.js";
export class View extends Button {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.children = [];
        this.loadedBlock = null;
        this.color = "red";
        this.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
    }
    save(saveToBlock) {
        saveToBlock.source = this.children.slice();
        BoundingRect.drawHierarchy();
        console.log("save");
    }
    load(loadFromBlock) {
        this.color = "lightgrey";
        this.loadedBlock = loadFromBlock;
        this.children = loadFromBlock.source;
        BoundingRect.drawHierarchy();
        console.log("load");
    }
    onMouseDown(type) {
    }
    onMouseMoveDown(type) {
    }
    onMouseUp(type) {
    }
}
